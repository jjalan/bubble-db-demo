export type Task = {
  id: number;

  _id: string;

  'Created By': string;

  'Created Date': string;

  name: string;
};


export type TaskVersion = {
  operation: string;
  task: Task
};
