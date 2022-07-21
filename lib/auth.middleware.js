import jwt from "jsonwebtoken";
import config from "../config.js";

// SECURITY GUARD (=Türsteher)
export const auth = (req, res, next) => {
  console.log("[AUTH Middleware] here...");

  const token = req.headers.authorization;
  console.log(token);

  try {
    const decodedUser = jwt.verify(token, config.JWT_SECRET);
    // console.log("Token Data: ", decodedUser);
    req.user = decodedUser;
    next();
  } catch (err) {
    next(err);
  }
};
