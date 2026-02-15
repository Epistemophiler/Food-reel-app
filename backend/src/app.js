import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";
import foodRouter from "./routes/food.route.js";
import foodPartnerRoute from "./routes/food-partner.route.js";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", router);
app.use("/api/food", foodRouter);
app.use("/api/food-partner", foodPartnerRoute);

export default app;
