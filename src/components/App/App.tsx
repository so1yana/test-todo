import { useCallback, useState } from 'react';
import Filter from '../Filter/Filter';
import NewTaskInput from '../NewTaskInput/NewTaskInput';
import TaskList from '../TaskList/TaskList';
import { ITask } from '../../interfaces';
import { filters } from '../../types';
import { FilterContext } from '../../context';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<filters>('All');

  const changeTaskById = useCallback(
    (id: string) => {
      const targetIndex = tasks.findIndex((el: ITask) => el.id === id);
      const changedTask: ITask = {
        ...tasks[targetIndex],
        checked: !tasks[targetIndex].checked,
      };
      const newTasks = [
        ...tasks.slice(0, targetIndex),
        changedTask,
        ...tasks.slice(targetIndex + 1),
      ];
      setTasks(newTasks);
    },
    [tasks]
  );

  const addTask = useCallback(
    (task: ITask) => {
      const oldTasks = [...tasks];
      oldTasks.push(task);
      setTasks(oldTasks);
    },
    [tasks]
  );

  const getActive = useCallback(() => {
    return tasks.filter((task: ITask) => !task.checked);
  }, [tasks]);

  const getCompleted = useCallback(() => {
    return tasks.filter((task: ITask) => task.checked);
  }, [tasks]);

  const getTasks = (): ITask[] => {
    if (filter === 'Active') {
      return getActive();
    }
    if (filter === 'Completed') {
      return getCompleted();
    }
    return tasks;
  };

  const clearCompleted = useCallback(() => {
    const newArr = getActive();
    setTasks(newArr);
  }, [getActive]);

  const getActiveCount = () => {
    return getActive().length;
  };

  return (
    <section className="todoapp" data-testid="todoapp">
      <NewTaskInput addTask={addTask} />
      <TaskList tasks={getTasks()} changeTask={changeTaskById} />
      <FilterContext.Provider value={filter}>
        <Filter
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          itemsLeft={getActiveCount()}
        />
      </FilterContext.Provider>
    </section>
  );
}

export default App;
