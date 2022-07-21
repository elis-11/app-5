import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { auth } from "../lib/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", auth, async (req, res, next) => {
  console.log("[ROUTE] Users ..."); 

  console.log("Authenticated user:", req.user);
  console.log("Authenticated user:", req.user._id); // its 
  const usersAll = await User.find();
  res.json(usersAll);
});

// Post user / Signup
userRouter.post("/", async (req, res, next) => {
  const userData = req.body;
  const { email } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      error: "We already got that user But thank you!",
    });
  }

  userData.password = bcrypt.hashSync(userData.password, 10);

  const user = await User.create(userData);
  res.json(user);
});

userRouter.post("/login", async (req, res, next) => {
  const pwPlain = req.body.password;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "User does not exist!" });
  }
  const matches = bcrypt.compareSync(pwPlain, user.password);
  if (!matches) {
    return res.status(400).json({ error: "Password incorrect!" });
  }

  const tokenData = { _id: user._id, email: user.email };
  const token = jwt.sign(tokenData, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  res.json({ ...user.toJSON(), token });
});

export default userRouter;
