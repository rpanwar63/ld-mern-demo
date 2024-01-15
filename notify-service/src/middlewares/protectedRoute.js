import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  const { user_id } = req.query;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      if (decoded.userId === user_id) {
        req.userId = decoded.userId;
        next();
      } else throw new Error("");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
