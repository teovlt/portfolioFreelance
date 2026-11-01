import { Router } from "express";
import { getSitemap } from "../controllers/sitemap.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sitemapRouter = Router();

sitemapRouter.get("/", asyncHandler(getSitemap));
