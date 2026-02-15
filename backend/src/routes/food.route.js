import express from "express";
import {
  createFood,
  deleteFood,
  getFoodItem,
  getFoodItemById,
  getLikedFood,
  getSavedFood,
  likeFoodItem,
  saveFood,
} from "../controllers/food.controller.js";
import {
  foodPartnerMiddleware,
  userMiddleware,
} from "../middlewares/auth.middlewares.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const foodRouter = express.Router();

foodRouter.post("/", foodPartnerMiddleware, upload.single("video"), createFood);

foodRouter.get("/", getFoodItem);

foodRouter.post("/like", userMiddleware, likeFoodItem);

foodRouter.post("/save", userMiddleware, saveFood);

foodRouter.get("/save", userMiddleware, getSavedFood);
foodRouter.get("/liked", userMiddleware , getLikedFood);
foodRouter.get('/byId', getFoodItemById);

foodRouter.delete('/', deleteFood);

export default foodRouter;
