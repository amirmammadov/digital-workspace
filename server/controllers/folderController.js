import Folder from "../models/Folder.js";
import File from "../models/File.js";
import path from "path";
import fs from "fs/promises";

export const getFolder = async (req, res) => {
  try {
    const { userID, id } = req.params;

    const folder = await Folder.findById({ userID, _id: id });

    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    const { userID } = req.params;

    const folders = await Folder.find({ userID });

    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createFolder = async (req, res) => {
  try {
    const { userID, title } = req.body;

    const newFolder = new Folder({
      userID,
      title,
    });

    await newFolder.save();

    const folders = await Folder.find({ userID });

    res.status(201).json(folders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const files = await File.find({ folderID: id });

    for (const file of files) {
      const curFile = await File.findOne(file._id);

      const filePath = path.join("./", "public/assets", curFile.fileName);

      fs.unlink(filePath, function (err) {
        if (err) {
          throw err;
        } else {
          console.log("Successfully deleted the file.");
        }
      });

      await File.findOneAndDelete(file._id);
    }

    await Folder.findByIdAndDelete(id);

    res.status(202).json(id);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
