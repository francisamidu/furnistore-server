import { Response } from "express";
import SessionRequest from "../interfaces/Session";

const imageUploadService = async (req: SessionRequest, res: Response) => {
  const { destination, filename } = req.file;
  console.log(process.env);
  return res.status(200).json({
    message: "Image uploaded",
    imageUrl: `http://localhost:5000\/${destination}\/${filename}`,
  });
};

export default imageUploadService;
