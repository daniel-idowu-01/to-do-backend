import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRoute.js";
import mongoose from "mongoose";

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

export default app;
