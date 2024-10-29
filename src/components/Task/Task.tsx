import { FC, memo, PropsWithChildren } from 'react';

import './Task.css';

interface ITask extends PropsWithChildren {
  completed: boolean;
  changeTask: () => void;
}

const Task: FC<ITask> = memo(({ children, completed, changeTask }) => {
  return (
    <li className={completed ? 'completed' : ''} data-testid="todo-task">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={changeTask}
        data-testid="todo-task-toggle"
      />
      <label onClick={changeTask}>
        <span className="title" data-testid="todo-task-text">
          {children}
        </span>
      </label>
    </li>
  );
});

export default Task;
