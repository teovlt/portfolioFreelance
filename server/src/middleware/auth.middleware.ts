import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { User, UserDocument } from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<UserDocument>;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  let userId: string;
  try {
    userId = verifyToken(token).userId;
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
