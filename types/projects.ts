export interface Project {
  title: string;
  stack: string;
  date: string;
}

export type ProjectWithId = Project & {
  id: string;
}