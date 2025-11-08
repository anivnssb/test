import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  password: { type: String, require: true },
});
export const User = mongoose.model("User", UserSchema);
