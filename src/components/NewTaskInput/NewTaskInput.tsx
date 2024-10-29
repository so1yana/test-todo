import { FC, FormEvent, memo, useState } from 'react';

import './NewTaskInput.css';
import { ITask } from '../../interfaces';

interface INewTaskInput {
  addTask: (task: ITask) => void;
}

const NewTaskInput: FC<INewTaskInput> = memo(({ addTask }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITask = { checked: false, value, id: value + Date.now() };
    addTask(newTask);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="task-input">
      <h1>Todos</h1>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        required
      />
      <input data-testid="task-input-submit" type="submit" hidden />
    </form>
  );
});

export default NewTaskInput;
