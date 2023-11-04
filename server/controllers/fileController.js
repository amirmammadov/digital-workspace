import File from "../models/File.js";
import Folder from "../models/Folder.js";

export const getFiles = async (req, res) => {
  try {
    const { folderID } = req.params;

    const files = await File.find({ folderID });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createFile = async (req, res) => {
  try {
    const { folderID } = req.params;
    const fileData = req.file;
    const username = req.user.email;

    if (!fileData) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const newFile = new File({
      folderID,
      username,
      fileName: fileData.filename,
      filePath: fileData.path,
      fileSize: fileData.size,
      fileType: fileData.mimetype,
    });

    await newFile.save();

    // const folder = await Folder.find({ folderID });

    // if (folder) {
    //   await folder.files.push(newFile);
    // }

    // await folder.save();

    const files = await File.find({ folderID });

    res.status(201).json(files);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
