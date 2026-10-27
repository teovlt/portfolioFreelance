import { Request, Response } from "express";
import { ContactInfo } from "../models/ContactInfo.js";

export const getContactInfo = async (req: Request, res: Response) => {
  res.json(await ContactInfo.findOne());
};

export const updateContactInfo = async (req: Request, res: Response) => {
  const { email, phone, location, locationUrl } = req.body ?? {};
  const info = await ContactInfo.findOneAndUpdate(
    {},
    { email, phone, location, locationUrl },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );
  res.json(info);
};
