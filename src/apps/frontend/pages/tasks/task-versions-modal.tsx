import React, { useEffect, useMemo, useState } from 'react';

import TaskService from '../../services/task.service';
import { Task, TaskVersion } from '../../types';

type TaskVersionsModalProps = {
  task: Task;
};

const TaskVersionsModal: React.FC<TaskVersionsModalProps> = ({ task }) => {
  const [taskVersions, setTaskVersions] = useState<TaskVersion[]>([]);
  const taskService = useMemo(() => new TaskService(), []);

  useEffect(() => {
    taskService.getTaskVersions(task._id).then((tv) => {
      setTaskVersions(tv);
    }).catch((e) => {
      console.log(e);
    });
  }, [task._id]);

  return (
    <div className="modal" id={`task${task.id}VersionsModal`}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Versions</h5>
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Operation</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
            { taskVersions.map((taskVersion: TaskVersion, index: number) => <tr key={`task_${taskVersion.task.id}_version_${index}`}>
              <th scope="row">{ taskVersion.operation }</th>
              <td>{ taskVersion.task.name }</td>
            </tr>) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TaskVersionsModal;
