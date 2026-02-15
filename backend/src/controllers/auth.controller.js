import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import foodPartnerModel from "../models/foodPartner.model.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const ifUserExist = await userModel.findOne({ email });

  if (ifUserExist) {
    return res.status(400).json({
      mgs: "user already exsits",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10 );

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jsonwebtoken.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(201).json({
    msg: "user registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      msg: "invalid email and passowrd",
    });
  }

  const isPass = await bcrypt.compare(password, user.password);

  if (!isPass) {
    return res.status(400).json({
      msg: "invalid email and passowrd",
    });
  }

  const token = jsonwebtoken.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(200).json({
    msg: "user login successfully",
    user: {
      token: token,
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}

export async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    msg: "User logged out successfully",
  });
}

export async function registerFoodPartner(req, res) {
  const { name, email, password, contactName, phone, address } = req.body;

  const isAccAlreadyExists = await foodPartnerModel.findOne({
    email,
  });

  if (isAccAlreadyExists) {
    res.json({
      msg: "Food partner user already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashPassword,
    contactName,
    phone,
    address,
  });

  const token = jsonwebtoken.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    msg: "Food partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

export async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      msg: "invalid email and passowrd",
    });
  }

  const isPass = await bcrypt.compare(password, foodPartner.password);

  if (!isPass) {
    return res.status(400).json({
      msg: "invalid email and passowrd",
    });
  }

  const token = jsonwebtoken.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "food partner logged in successfully",
    foodPartner: {
      token,
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
      role: foodPartner.role,
    },
  });
}

export async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}
