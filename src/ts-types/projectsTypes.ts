export type Project = {
  id: string;
  title: string;
  description: string;
};

export type Task = {
  assignedUsers: string[];
  id: string;
  isDone: boolean;
  title: string;
};

export type Item = {
  projectId: string;
  tasksList: Task[];
};
