import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await axios
      .post(
        "/api/auth/user/login",
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
      }).then((res) => res);

    if (res && res.data) {
      navigate("/home");
    }
  };

  return (
    <div className="h-full w-full pr-8 bg-linear-to-b from-[#061523] to-[#071827] ">
      <div className="w-full max-w-2xl mx-auto ml-4 border shadow-2xl mt-30 rounded-2xl border-white/3 p-7 bg-white/5">
        <div className="max-w-[24rem] w-full mx-auto text-[#e8f2f7]">
          <h1>Welcome back</h1>
          <p className="text-[#98acb7] mb-3">Log in to continue to your account.</p>

          <form onSubmit={handleSubmit} className="block">
            <div className="mb-5">
              <label htmlFor="email" className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-[#e8f2f7] text-sm font-medium opacity-90 mb-2">Password <a href="#" className="float-right text-sky-300 text-[13px]">Forgot password?</a></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                className="w-full p-3 rounded-xl border border-white/4 bg-white/5 text-[#e8f2f7] text-base"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-sky-300 text-[#012028] font-bold">Log in</button>
          </form>

          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            <span>Don't have an account? </span>
            <Link to="/user/register" className="font-medium text-sky-300 hover:opacity-80 hover:underline">
              Sign up
            </Link>
          </div>

          <div className="text-center text-sm mt-3.5 text-[#98acb7] opacity-95">
            <span>Are you a food partner? </span>
            <Link to="/food-partner/login" className="font-medium text-sky-300 hover:opacity-80 hover:underline">
              Partner Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
