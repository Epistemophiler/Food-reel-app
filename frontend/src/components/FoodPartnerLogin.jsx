import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

const API_URL = import.meta.env.VITE_API_URL;

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await api
      .post(
        `${API_URL}/api/auth/food-partner/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .catch((error) => {
        console.error("Login error:", error.response?.data || error.message);
        alert("Login failed: " + (error.response?.data?.msg || error.message));
      });

    const data = res?.data.foodPartner;

    if (data) {
      navigate("/food-partner/" + data._id);
    }
  };

  return (
    <div className="h-full w-full pr-8 bg-linear-to-b from-[#061523] to-[#071827]">
      <div className="w-full max-w-2xl rounded-2xl border border-white/3 p-7 m-2.5 mx-auto bg-white/5 shadow-2xl ml-4 mt-30">
        <div className="max-w-[24rem] w-full mx-auto text-[#e8f2f7]">
          <h1>Partner sign in</h1>
          <p className="text-[#98acb7] mb-3">
            Partner sign in to manage your listings.
          </p>

          <form onSubmit={handleSubmit} className="block">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Business Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your business email"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-300 text-[#012028] font-bold"
            >
              Login
            </button>
          </form>
          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            Don't have an account?{" "}
            <Link
              to="/food-partner/register"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              Register
            </Link>
          </div>

          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            Are you a user?{" "}
            <Link
              to="/user/login"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
