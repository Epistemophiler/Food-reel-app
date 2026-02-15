import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // Basic validation
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const response = await axios
      .post(
        "/api/auth/user/register",
        {
          name,
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

    if (response && response.data) {
      navigate("/home");
    }
  };
  return (
    <div className="h-full w-full pr-8 bg-linear-to-b from-[#061523] to-[#071827]">
      <div className="w-full max-w-2xl rounded-2xl border border-white/3 p-7 m-2.5 mx-auto bg-white/5 shadow-2xl ml-4 mt-20">
        <div className="max-w-[24rem] w-full mx-auto text-[#e8f2f7]">
          <h1>Create account</h1>
          <p className="text-[#98acb7] mb-3">
            Create an account to get started.
          </p>

          <form onSubmit={handleSubmit} className="block">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Create a password"
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
            Already have an account?{" "}
            <Link
              to="/user/login"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              Log in
            </Link>
          </div>

          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            Are you a food partner?{" "}
            <Link
              to="/food-partner/register"
              className="font-medium text-sky-300 hover:opacity-80 hover:underline"
            >
              Partner Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
