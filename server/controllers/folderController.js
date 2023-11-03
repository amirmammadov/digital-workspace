import User from "../models/User.js";
import Folder from "../models/Folder.js";

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

    await Folder.findByIdAndDelete(id);

    res.status(202).json(id);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
