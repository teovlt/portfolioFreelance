import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { contactRouter } from "./routes/contact.routes.js";
import { experienceRouter, packageRouter, photoRouter, socialRouter } from "./routes/content.routes.js";
import { projectRouter } from "./routes/project.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { statsRouter } from "./routes/stats.routes.js";
import { uploadRouter } from "./routes/upload.routes.js";

const app = express();

// In production requests go through Traefik then nginx; trusting exactly those
// two hops gives the real client IP to the rate limiter without letting
// clients spoof it through X-Forwarded-For
app.set("trust proxy", process.env.TRUST_PROXY ? Number(process.env.TRUST_PROXY) : 0);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/socials", socialRouter);
app.use("/api/photos", photoRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/packages", packageRouter);
app.use("/api/experiences", experienceRouter);
app.use("/api/contact", contactRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/stats", statsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
