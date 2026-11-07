import { Router } from "express";
import { renderPage } from "../controllers/render.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// nginx proxies /, /projects/:slug and /parcours here (see nginx.conf)
export const renderRouter = Router();

renderRouter.get("/*", asyncHandler(renderPage));
