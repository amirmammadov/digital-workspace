import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

import {
  createFolder,
  getFolders,
  getFolder,
  deleteFolder,
} from "../controllers/folderController.js";

router
  .route("/:userID/folder")
  .get(verifyToken, getFolders)
  .post(verifyToken, createFolder);

router
  .route("/:userID/folder/:id")
  .get(verifyToken, getFolder)
  .delete(verifyToken, deleteFolder);

export default router;
