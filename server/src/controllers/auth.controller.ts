import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import { HttpError } from "../middleware/error.middleware.js";
import { signAdminToken } from "../utils/jwt.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new HttpError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = signAdminToken({ adminId: admin.id, email: admin.email });
  res.json({ token, email: admin.email });
};
