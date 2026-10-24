import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

// Interactive creation of a dashboard user, so credentials never live in .env.
const run = async () => {
  const rl = createInterface({ input, output });
  const username = (await rl.question("Username: ")).trim();
  const email = (await rl.question("Email: ")).toLowerCase().trim();
  const password = await rl.question("Password: ");
  rl.close();

  if (!username || !email || !password) {
    throw new Error("Username, email and password are required");
  }

  await connectDB();

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    console.log(`A user with this username or email already exists, skipping.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, email, passwordHash });
    console.log(`User ${username} created.`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
