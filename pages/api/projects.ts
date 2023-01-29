import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";

interface Project {
  title: string;
  stack: string;
  date: string;
}

interface ProjectsHandlerResponse {
  projects: string[];
}

const projectsDirectory = path.join(process.cwd(), "projects");

export default function projectsHandler(
  _: NextApiRequest,
  res: NextApiResponse<ProjectsHandlerResponse>
) {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      ...(matterResult.data as Project),
    };
  });

  const allProjectsSortedByDate = allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const allProjectTitles = allProjectsSortedByDate.map((p) => p.title);

  res.status(200).json({ projects: allProjectTitles });
}
