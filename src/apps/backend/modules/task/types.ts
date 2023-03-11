/* eslint-disable max-classes-per-file */

export class Task {
  id: number;
  _id: string;
  'Created By': string;
  'Created Date': string;
  name: string;
}

export class TaskRevision {
  operation: string;
  task: Task;
}
