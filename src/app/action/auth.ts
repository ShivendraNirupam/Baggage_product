"use server"
import { connectDb } from "@/db/dbConfig";
import {
  comparePassword,
  createSessionId,
  removeUserFromSession,
} from "@/lib/utility";
import {
  SignInFormSchema,
  SignInFormState,
  SignUpFormSchema,
  SignUpFormState,
} from "@/lib/validatorsSchema/schema";
import { User } from "@/model/user.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {generateSalt,
  hashPassword,} from "@/lib/utils"

export async function signup(
  _prevstate: SignUpFormState,
  formdata: FormData
): Promise<SignUpFormState> {
  await connectDb();

  const username = formdata.get("username") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const validateField = SignUpFormSchema.safeParse({
    username,
    email,
    password,
  });
  console.log("hi 1")
  console.log(validateField)
  if (!validateField.success) {
    return {
      username,
      email,
      password,
      errors: validateField.error.flatten().fieldErrors,
    };
  }

  console.log("hi 2")

  const user = await User.findOne({ email });

  if (user) {
    return {
      message: "User already exist",
    };
  }

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      salt,
    });

    await newUser.save();
    console.log(user)
    const sessionId = await createSessionId(newUser);
    const cookieStore = await cookies();
    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: newUser.sessionExpiry!,
      path: "/",
    });
  } catch (error: any) {
    return {
      error: error.message,
      message: " Error creating user",
      statusCode: 500,
    };
  }

  return redirect("/dashboard");
}

export async function signin(
  _prevState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  await connectDb();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedField = SignInFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedField.success) {
    return {
      email,
      password,
      errors: validatedField.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      return {
        message: "Invalid User",
      };
    }
    //Chech the password from the databsae
    const isCorrectPassword = await comparePassword({
      hashedPassword: user.password,
      password,
      salt: user.salt,
    });
    console.log(isCorrectPassword)

    if (!isCorrectPassword) {
      return {
        error: "Incorrect Password",
        message: "Unable to log you in",
      };
    }


    const sessionId = await createSessionId(user);

    const cookieStore = await cookies();

    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: user.sessionExpiry,
      path: "/",
    });

    

  } catch (error: any) {
    return {
      error: error.message,
      message: "Error while logging in. ",
      statusCode: 500
    }
  }
  return redirect("/dashboard")
}


export async function logout() {
    await removeUserFromSession()
    redirect("/signin")
}