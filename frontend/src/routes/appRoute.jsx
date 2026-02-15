import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import FoodPartnerLogin from "../components/FoodPartnerLogin";
import FoodPartnerRegister from "../components/FoodPartnerRegister";
import Home from "../general/Home";
import CreateFood from "../food-partner/CreateFood";
import Profile from "../food-partner/Profile";
import CartSummary from "../components/CartSummary";

export default function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />}></Route>
        <Route path="/user/login" element={<UserLogin />}></Route>
        <Route path="/food-partner/register" element={<FoodPartnerRegister />}></Route>
        <Route path="/food-partner/login" element={<FoodPartnerLogin />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<UserLogin/>}></Route>
        <Route path="/food-partner" element={<CreateFood />}></Route>
        <Route path="/food-partner/:id" element={<Profile/>}></Route>
        <Route path=":user/:food-partner/:id" element={<Profile/>}></Route>
        <Route path="/foodSummary" element={<CartSummary/>}></Route>
      </Routes>
    </Router> 
  );
}
