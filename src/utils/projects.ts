import { ProjectCategory, type Project } from "@/types/project";

// Order in which the sections appear on the public site
export const projectCategoryOrder = [ProjectCategory.CLIENT, ProjectCategory.DEMO, ProjectCategory.PERSONAL];

// Projects saved before categories existed have none and count as personal
export const projectCategory = (project: Project) => project.category ?? ProjectCategory.PERSONAL;

export const sortProjects = (projects: Project[]) =>
  [...projects].sort(
    (a, b) =>
      projectCategoryOrder.indexOf(projectCategory(a)) - projectCategoryOrder.indexOf(projectCategory(b)) || a.order - b.order,
  );
