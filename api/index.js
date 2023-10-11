import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server  is running to the port 3000 !!!.");
});
///////////////////////////////////////////////////////////
// app.get("/test", (req, res) => {
//   res.json({ message: "Hi world33" });
// });
app.use("/api/user", userRouter);
// ///////////// for signup //////////////////////////////////////////
app.use("/api/auth", authRouter);
// //////////////  //////////////////////////////////////////////
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error ";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// data coming path:
// index.js -->
// routes: auth.route.js -->
// controllers: auth.controller.js
