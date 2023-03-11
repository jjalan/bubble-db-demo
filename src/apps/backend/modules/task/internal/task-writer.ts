import _ from 'lodash';

import { Task } from '../types';

import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(createdTask: Task): Promise<Task> {
    const task = await TaskRepository.taskDB.create({
      ...createdTask,
    });
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async updateTask(updatedTask: Task): Promise<Task | undefined> {
    let task = await TaskRepository.taskDB.findOne({ where: { _id: updatedTask._id } });
    if (task === null) {
      return undefined;
    }

    _.assign(task, { ...updatedTask });
    task = await task.save();
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async deleteTask(taskId: string): Promise<void> {
    const task = await TaskRepository.taskDB.findOne({ where: { _id: taskId } });
    if (task === null) {
      return;
    }

    await task.destroy();
  }
}
