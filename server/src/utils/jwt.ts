import jwt from "jsonwebtoken";

export type AdminTokenPayload = {
  adminId: string;
  email: string;
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const signAdminToken = (payload: AdminTokenPayload) => {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
};

export const verifyAdminToken = (token: string): AdminTokenPayload => {
  return jwt.verify(token, getSecret()) as AdminTokenPayload;
};
