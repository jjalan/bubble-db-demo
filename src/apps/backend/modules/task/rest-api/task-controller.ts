import axios from 'axios';
import {
  NextFunction, Request, Response,
} from 'express';

import TaskService from '../task-service';
import { Task } from '../types';

export default class TaskController {
  public static async getAllTasks(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <void> {
    try {
      const tasks = await TaskService.getTasks();
      res.status(200).send(tasks);
    } catch (e) {
      next(e);
    }
  }

  public static async getTaskVersions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <void> {
    try {
      const versions = await TaskService.getTaskVersions(req.params.id);
      res.status(200).send(versions);
    } catch (e) {
      next(e);
    }
  }

  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const createdTaskInBubble = await TaskController.getBubbleTaskById(req.body.id);
      const task: Task = await TaskService.createTask(createdTaskInBubble);
      res.status(201).send(task);
    } catch (e) {
      next(e);
    }
  }

  public static async updateTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updatedTaskInBubble = await TaskController.getBubbleTaskById(req.body.id);
      const task: Task | undefined = await TaskService.updateTask(updatedTaskInBubble);
      res.status(200).send(task);
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await TaskService.deleteTask(req.body.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  private static async getBubbleTaskById(id: string): Promise<Task> {
    const response = await axios.get(`https://ecl-demo.bubbleapps.io/version-test/api/1.1/obj/task/${id}`);
    return response.data.response as Task;
  }
}
