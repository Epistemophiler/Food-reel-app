import foodModel from "../models/food.model.js";
import likeModel from "../models/like.model.js";
import saveModel from "../models/save.model.js";
import uploadfile from "../services/storage.services.js";
import { v4 as uuidv4 } from "uuid";

export async function createFood(req, res) {
  const fileUploadResult = await uploadfile(req.file.buffer, uuidv4());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
    price: req.body.price,
  });

  res.status(201).json({
    msg: "foodItem created",
    food: foodItem,
    success: true,
  });

  res.send("food item created");
}

export async function getFoodItem(req, res) {
  const foodItem = await foodModel.find({});
  res.status(200).json({
    mgs: "successfull",
    foodItem,
  });
}

export async function getFoodItemById(req, res) {
  const foodIds = req.query["foodIds[]"];

  const ids = Array.isArray(foodIds) ? foodIds : [foodIds];

  const foodItem = await foodModel.find({
    _id: { $in: ids },
  });

  res.status(200).json({
    foodItem,
  });
}

export async function likeFoodItem(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    userId: user._id,
    foodId: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      userId: user._id,
      foodId: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.json({
      like: false,
    });
  }
  await likeModel.create({
    userId: user._id,
    foodId: foodId,
  });
  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });
  return res.json({
    like: true,
  });
}

export async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const alreadySaved = await saveModel.findOne({
    userId: user._id,
    foodId,
  });

  if (alreadySaved) {
    await saveModel.deleteOne({
      userId: user._id,
      foodId,
    });

    return res.json({
      saved: false,
      message: "Unsaved",
    });
  }

  await saveModel.create({
    userId: user._id,
    foodId,
  });

  return res.json({
    save: true,
  });
}

export async function getSavedFood(req, res) {
  const user = req.user;
  const savedFoodEntries = await saveModel
    .find({ userId: user._id })
    .populate("foodId")
    .select("foodId");

  if (!savedFoodEntries || savedFoodEntries.length === 0) {
    return res.status(404).json({
      message: "No saved food items found.",
    });
  }
  const saveFood = savedFoodEntries.map((entry) => entry.foodId._id);

  return res.status(200).json({
    saveFood,
    savedFoodEntries,
  });
}

export async function getLikedFood(req, res) {
  const user = req.user;
  const likes = await likeModel.find({ userId: user._id }).select("foodId");
  res.json(likes.map((l) => l.foodId.toString()));
}

export async function deleteFood(req, res) {
  const _id = req.body;

  await foodModel.findByIdAndDelete(_id);

  res.status(200).json({ success: true });
}
