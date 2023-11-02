import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please,provide folder name!"],
      minLength: 3,
      maxLength: 30,
    },
    userID: {
      type: String,
      required: [true, "Please,provide userID"],
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
