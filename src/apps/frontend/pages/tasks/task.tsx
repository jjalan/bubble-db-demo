import React from 'react';

import { Task } from '../../types';

type TaskRowProps = {
  task: Task
};

const TaskRow: React.FC<TaskRowProps> = ({ task }) => (
  <>
    <tr>
      <th scope="row">{ task._id }</th>
      <td>{ task.name }</td>
      <td>{ task['Created Date'] }</td>
      <td>{ task['Created By'] }</td>
      <td><button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#task${task.id}VersionsModal`}><i className="bi bi-clock-history"></i></button></td>
    </tr>
  </>
);

export default TaskRow;
