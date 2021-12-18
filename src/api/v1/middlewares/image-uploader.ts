import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    return callback(null, "public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (
  req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) => {
  const acceptedFileExtensions = [
    "jpg",
    "jpeg",
    "webp",
    "png",
    "jiff",
    "gif",
    "svg",
  ];
  const fileType = file.mimetype.split("/")[1];
  if (acceptedFileExtensions.includes(fileType)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({
  fileFilter,
  storage,
});
