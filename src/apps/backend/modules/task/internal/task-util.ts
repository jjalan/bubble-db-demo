import { Task, TaskRevision } from '../types';

import { TaskDb, TaskRevisionDb } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDb): Task {
    const task = new Task();
    task.id = taskDb.id;
    task._id = taskDb._id;
    task.name = taskDb.name;
    task['Created By'] = taskDb['Created By'];
    task['Created Date'] = taskDb['Created Date'];
    return task;
  }

  public static convertTaskRevisionDBToTaskRevision(taskRevisionDb: TaskRevisionDb): TaskRevision {
    const taskRevision = new TaskRevision();
    taskRevision.operation = taskRevisionDb.dataValues.operation;
    taskRevision.task = TaskUtil.convertTaskDBToTask(
      taskRevisionDb.dataValues.document as unknown as TaskDb,
    );
    return taskRevision;
  }
}
