import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.restaurantName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({
      name,
      contactName,
      phone,
      address,
      email,
      password,
    });

    const res = await api
      .post(
        "/api/auth/food-partner/register",
        {
          name,
          contactName,
          phone,
          address,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .catch((error) => {
        console.error(
          "Registration error:",
          error.response?.data || error.message,
        );
        alert(
          "Registration failed: " +
            (error.response?.data?.msg || error.message),
        );
      });

    if (res && res.data) {
      navigate("/food-partner/" + res.data._id);
    }
  };

  return (
    <div className="h-full w-full pr-8 bg-linear-to-b from-[#061523] to-[#071827] overflow-y-scroll overflow-x-hidden">
      <div className=" w-full max-w-2xl rounded-2xl border border-white/3 p-7 m-2.5 mx-auto bg-white/5 shadow-2xl ml-4 ">
        <div className="max-w-[24rem] w-full mx-auto text-[#e8f2f7]">
          <h1>Partner register</h1>
          <p className="text-[#98acb7] mb-3">
            Create a partner account to list your offerings.
          </p>

          <form onSubmit={handleSubmit} className="block">
            <div className="mb-5">
              <label
                htmlFor="restaurantName"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                placeholder="Enter your restaurant name"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="contactName"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                placeholder="Enter contact person's name"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(123) 456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}|\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}"
                maxLength="14"
                autoComplete="tel"
                inputMode="tel"
                title="Please enter a valid phone number (e.g., (123) 456-7890 or 1234567890)"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="address"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter restaurant address"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

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
                placeholder="Enter your business email"
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
                placeholder="Create a secure password"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-300 text-[#012028] font-bold"
            >
              Register
            </button>
          </form>
          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            Already a partner?{" "}
            <Link
              to="/food-partner/login"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              Sign in
            </Link>
          </div>

          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            Are you a user?{" "}
            <Link
              to="/user/register"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              User Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
