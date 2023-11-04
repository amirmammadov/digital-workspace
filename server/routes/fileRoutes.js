import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

import { getFiles, createFile } from "../controllers/fileController.js";

router
  .route("/:folderID/file")
  .get(verifyToken, getFiles)
  .post(verifyToken, createFile);

export default router;
