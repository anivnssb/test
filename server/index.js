import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { User } from "./modal/user.js";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/api/login", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  if (data.name && data.password) {
    const user = await User.findOne({ name: data.name });
    if (user.password === data.password) {
      const user = await User.findOne({ name: data.name }).select("-password");
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      res.status(200).json({ message: "login succesfull", token: token, user });
    } else {
      res.status(403).json({ message: "invalid credential" });
    }
  }
});
app.get("/api/user-all", async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verifiedResult = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await User.findOne({ _id: verifiedResult.id });

      if (userInfo.type === "admin") {
        const user = await User.find().select("-password");
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/user-create", async (req, res) => {
  const data = req.body;
  if (data.name && data.type && data.password) {
    await User.create(data);
    res.send("user created");
  }
});

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log("Connected to DB"));
app.listen(process.env.PORT, () => {
  console.log(`server listening to PORT ${process.env.PORT}`);
});
