import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  folderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

export default File;
