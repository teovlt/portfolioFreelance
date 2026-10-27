import { Experience } from "../models/Experience.js";
import { Package } from "../models/Package.js";
import { Photo } from "../models/Photo.js";
import { Social } from "../models/Social.js";
import { createCrudRouter } from "../utils/crudRouter.js";

export const socialRouter = createCrudRouter(Social, { publicFilter: { visible: true } });
export const photoRouter = createCrudRouter(Photo, { publicFilter: { visible: true } });
export const packageRouter = createCrudRouter(Package, { publicFilter: { visible: true } });
export const experienceRouter = createCrudRouter(Experience, { publicFilter: { visible: true } });
