import { Task, TaskRevision } from '../types';

import { TaskDb } from './store/task-db';
import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTasks(): Promise<Task[]> {
    const taskDbs = await TaskRepository.taskDB.findAll();
    return taskDbs.map((task: TaskDb) => TaskUtil.convertTaskDBToTask(task));
  }

  public static async getTaskVersions(taskId: string): Promise<TaskRevision[]> {
    const task = await TaskRepository.taskDB.findOne({ where: { _id: taskId } });
    const revisions = await TaskRepository.revisionDB.findAll({ where: { model: 'TaskDb', documentId: task.id } });
    return revisions.map((revision) => TaskUtil.convertTaskRevisionDBToTaskRevision(revision));
  }
}
