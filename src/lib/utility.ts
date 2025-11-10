import { hashPassword } from "./utils"
import crypto from "crypto"
import { connectDb } from "@/db/dbConfig"
import { cookies } from "next/headers"
import { User } from "@/model/user.model"

export async function createSessionId(User: any) {
    await connectDb()
  const sessionId = crypto.randomBytes(512).toString("hex").normalize()
  const expiry = new Date(Date.now() + Number(process.env.SESSION_EXPIRY || 86400000))
  User.sessionId = sessionId
  User.sessionExpiry = expiry

  await User.save()

  return sessionId
}

export async function comparePassword({
  hashedPassword, password, salt
} : { hashedPassword: string,
      password: string,
      salt: string
 }) {

    const inputHashedPassword = await hashPassword(password, salt) as string

    return crypto.timingSafeEqual(Buffer.from(inputHashedPassword, "hex"), Buffer.from(hashedPassword, "hex"))
 }

 export async function removeUserFromSession() {
    await connectDb();
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value

    if(!sessionId) return null

    await User.updateOne(
      {sessionId},
      {$unset: {sessionId: "", sessionExpiry: ""}}
    )

    cookieStore.delete("sessionId")
 }

 export async function getSessionId() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')
  if(!sessionId) {
    return false
  }

  return true
  
 }