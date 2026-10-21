import { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      adminId?: string;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  try {
    const payload = verifyAdminToken(token);
    req.adminId = payload.adminId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
