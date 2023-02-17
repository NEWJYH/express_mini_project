import mongoose from "mongoose";

// 스키마 생성
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: {
    title: String,
    description: String,
    image: String,
  },
});

export const User = mongoose.model("User", UserSchema);
