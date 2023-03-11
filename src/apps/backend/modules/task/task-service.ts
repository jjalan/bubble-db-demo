import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import { Task, TaskRevision } from './types';

export default class TaskService {
  public static async getTasks(): Promise<Task[]> {
    return TaskReader.getTasks();
  }

  public static async getTaskVersions(taskId: string): Promise<TaskRevision[]> {
    return TaskReader.getTaskVersions(taskId);
  }

  public static async createTask(createdTask: Task): Promise<Task> {
    return TaskWriter.createTask(createdTask);
  }

  public static async updateTask(updatedTask: Task): Promise<Task | undefined> {
    return TaskWriter.updateTask(updatedTask);
  }

  public static async deleteTask(taskId: string): Promise<void> {
    return TaskWriter.deleteTask(taskId);
  }
}
