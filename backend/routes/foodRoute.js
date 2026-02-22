import express from "express";
import { addFood, listFood ,removeFood} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Define the storage engine first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  // Ensure the uploads directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize the multer upload with the storage engine
const upload = multer({ storage: storage });

// Use the upload middleware in the route
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list" , listFood)
foodRouter.post("/remove" , removeFood);

export default foodRouter;
