/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import TaskController from './task-controller';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.get('/', TaskController.getAllTasks);
    router.get('/:id/versions', TaskController.getTaskVersions);

    router.post('/', TaskController.createTask);
    router.patch('/', TaskController.updateTask);
    router.delete('/', TaskController.deleteTask);

    return router;
  }
}
