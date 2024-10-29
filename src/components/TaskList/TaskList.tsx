import { FC, memo } from 'react';
import Task from '../Task/Task';

import './TaskList.css';
import { ITask } from '../../interfaces';

interface ITaskList {
  tasks: ITask[];
  changeTask: (id: string) => void;
}

const TaskList: FC<ITaskList> = memo(({ tasks, changeTask }) => {
  const normalizedTasks = tasks.map((task: ITask) => {
    return (
      <Task
        key={task.id}
        completed={task.checked}
        changeTask={() => changeTask(task.id)}
      >
        {task.value}
      </Task>
    );
  });

  return (
    <ul data-testid="todo-list" className="todo-list">
      {normalizedTasks}
    </ul>
  );
});

export default TaskList;
