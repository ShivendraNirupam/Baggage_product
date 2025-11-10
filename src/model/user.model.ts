import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  salt: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String
  },
  sessionExpiry: {
    type: Date,
  }
}, {timestamps: true});

userSchema.index({sessionExpiry: 1}, {expireAfterSeconds: 0})

export const User = models.User ||  model("User", userSchema) ;