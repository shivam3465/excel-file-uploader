import express from "express";
import { uploadFile } from "../controllers/user.js";
import { fileUploaderHandler } from "../middleware/multerFileUpload.js";

//creating express router for handling user routes
const router = express.Router();

//calling relevant controllers for request coming on specific routes
router.post("/upload", fileUploaderHandler, uploadFile);

export default router;
