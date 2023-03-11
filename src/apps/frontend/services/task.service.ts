import { Task, TaskVersion } from '../types';

import APIService from './api.service';

export default class TaskService extends APIService {
  async getTasks(): Promise<Task[]> {
    const response = await this.apiClient.get('/tasks');
    return response.data as Task[];
  }

  async getTaskVersions(taskId: string): Promise<TaskVersion[]> {
    const response = await this.apiClient.get(`/tasks/${taskId}/versions`);
    return response.data as TaskVersion[];
  }
}
