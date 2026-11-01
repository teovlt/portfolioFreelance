import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../middleware/error.middleware.js";
import { Message } from "../models/Message.js";
import { notifyByFormspree } from "../utils/notify.js";
import { isEmail, str } from "../utils/input.js";

export const createMessage = async (req: Request, res: Response) => {
  const body = req.body ?? {};

  // Honeypot, see review.controller
  if (str(body.website2, 200)) return res.status(201).json({ ok: true });

  const name = str(body.name, 80);
  const email = str(body.email, 200);
  const subject = str(body.subject, 200);
  const message = str(body.message, 5000);

  if (name.length < 2) throw new HttpError(400, "Name is required");
  if (!isEmail(email)) throw new HttpError(400, "Invalid email");
  if (subject.length < 2) throw new HttpError(400, "Subject is required");
  if (message.length < 10) throw new HttpError(400, "Message is too short");

  const saved = await Message.create({ name, email, subject, message });

  // Not awaited: the visitor shouldn't wait on Formspree
  void notifyByFormspree({
    _subject: `Nouveau message de ${name} : ${subject}`,
    name,
    email,
    sujet: subject,
    message,
    gerer: `${process.env.FRONTEND_URL ?? ""}/admin/messages`,
  });

  res.status(201).json({ ok: true, id: saved.id });
};

export const listMessages = async (req: Request, res: Response) => {
  res.json(await Message.find().sort({ createdAt: -1 }));
};

export const updateMessage = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
  const message = await Message.findByIdAndUpdate(req.params.id, { read: Boolean(req.body?.read) }, { new: true });
  if (!message) throw new HttpError(404, "Message not found");
  res.json(message);
};

export const deleteMessage = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
  await Message.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
