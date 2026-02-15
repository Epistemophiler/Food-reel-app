import express from "express";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js";

const foodPartnerRoute = express.Router();

foodPartnerRoute.get("/:id", getFoodPartnerById);
 
export default foodPartnerRoute;
