import { FileImageMap } from "../interfaces";

export const findFileName = (originalFileName: string) => {
  const lastIndexOfDash = originalFileName.indexOf("-");

  if (lastIndexOfDash !== -1) {
    const fileNameAfterFirstDash = originalFileName.substring(
      lastIndexOfDash + 1
    );
    return fileNameAfterFirstDash;
  }

  return originalFileName;
};

export const commonFileSize = (size: string) => {
  return (Number(size) / 1024 / 1024).toPrecision(3);
};

export const defineImgForFile = (fileName: string) => {
  const fileImgs: FileImageMap = {
    pdf: "pdf.png",
    png: "photo.png",
    jpg: "photo.png",
    jpeg: "photo.png",
    txt: "text.png",
    docx: "docx.png",
    default: "file.png",
  };

  const fileNameParts = fileName.split(".");
  const fileType = fileNameParts.pop();

  const imgKey: keyof FileImageMap =
    (fileType as keyof FileImageMap) || "default";

  return fileImgs[imgKey];
};
