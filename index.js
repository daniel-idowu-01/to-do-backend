import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to database
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_LOCAL_DB)
    .then(() => console.log("Database connected successfully!!"))
    .catch(() => console.log("Cannot connect to database!!"));
};
await connectDB();

app.get("/", async (req, res) => {
  res.send("App is running!!!");
});

app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

export default app;
