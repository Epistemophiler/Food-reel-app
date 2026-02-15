import foodPartnerModel from "../models/foodPartner.model.js";
import foodModel from "../models/food.model.js";

export async function getFoodPartnerById(req, res) {
  const { id } = req.params;
  const foodPartner = await foodPartnerModel.findById(id);
  const foodItemsByPartner = await foodModel.find({ foodPartner: id });

  if (!foodPartner) {
    return res.status(404).json({ msg: "Food Partner not found" });
  }
  res.status(200).json({
    msg: "Food Partner fetched successfully",
    foodPartner,
    foodItemsByPartner,
  });
}
  