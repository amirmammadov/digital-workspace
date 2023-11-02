import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please,provide your username!"],
      minLength: 5,
      maxLength: 30,
    },
    password: {
      type: String,
      required: [true, "Please,provide your password!"],
      minLength: 6,
    },
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
