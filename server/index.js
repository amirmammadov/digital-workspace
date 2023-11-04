import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";

import userRouter from "./routes/userRoutes.js";
import folderRouter from "./routes/folderRoutes.js";
import fileRouter from "./routes/fileRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use(helmet());

app.use(morgan("common"));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/file", upload.single("file"), fileRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });
