/* eslint-disable max-len */
/* eslint-disable no-console */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import TaskService from '../../services/task.service';
import { Task } from '../../types';

import TaskRow from './task';
import TaskVersionsModal from './task-versions-modal';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskService = useMemo(() => new TaskService(), []);

  const fetchTasks = useCallback(() => {
    taskService.getTasks().then((t) => {
      setTasks(t);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Created Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          { tasks.map((task: Task) => <TaskRow key={task._id} task={task} />) }
        </tbody>
      </table>
      { tasks.map((task: Task) => <TaskVersionsModal key={task._id} task={task} />) }
    </>
  );
};

export default TasksPage;
