import { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { HttpError } from "../middleware/error.middleware.js";

export const listProjects = async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) {
    throw new HttpError(404, "Project not found");
  }
  res.json(project);
};

export const createProject = async (req: Request, res: Response) => {
  const existing = await Project.findOne({ slug: req.body.slug });
  if (existing) {
    throw new HttpError(409, "A project with this slug already exists");
  }

  if (req.body.order === undefined) {
    const last = await Project.findOne().sort({ order: -1 });
    req.body.order = last ? last.order + 1 : 0;
  }

  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  if (req.body.slug && req.body.slug !== req.params.slug) {
    const conflict = await Project.findOne({ slug: req.body.slug });
    if (conflict) {
      throw new HttpError(409, "A project with this slug already exists");
    }
  }

  const project = await Project.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const project = await Project.findOneAndDelete({ slug: req.params.slug });
  if (!project) {
    throw new HttpError(404, "Project not found");
  }
  res.status(204).send();
};
