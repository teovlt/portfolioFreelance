import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/User.js";
import { HttpError } from "../middleware/error.middleware.js";
import { signToken } from "../utils/jwt.js";

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body as { identifier?: string; password?: string };

  if (!identifier || !password) {
    throw new HttpError(400, "Identifier and password are required");
  }

  const value = identifier.trim();
  const user = await User.findOne({ $or: [{ email: value.toLowerCase() }, { username: value }] }).select("+passwordHash");
  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = signToken({ userId: user.id });
  res.json({ token, user });
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};
