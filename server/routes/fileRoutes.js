import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

import {
  getFiles,
  createFile,
  deleteFile,
} from "../controllers/fileController.js";

router
  .route("/:folderID/file")
  .get(verifyToken, getFiles)
  .post(verifyToken, createFile);

router.route("/:folderID/file/:id").delete(verifyToken, deleteFile);

export default router;
