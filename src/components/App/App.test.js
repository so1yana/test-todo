import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Setup tests for entire app', () => {
  test('Testing app rendering', () => {
    render(<App />);
    expect(screen.getByTestId('todoapp')).toBeInTheDocument();
    expect(screen.getByTestId('task-input')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  test('Testing add todos and check', () => {
    render(<App />);
    const inputSumbit = screen.getByTestId('task-input-submit');
    const newTaskInput = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(newTaskInput, {
      target: { value: 'testtest' },
    });
    expect(newTaskInput).toHaveValue('testtest');
    fireEvent.click(inputSumbit);
    expect(newTaskInput).toHaveValue('');
    expect(screen.getAllByTestId('todo-task')).toHaveLength(1);
    expect(screen.getByTestId('todo-task-text')).toHaveTextContent('testtest');
    fireEvent.click(screen.getByTestId('todo-task-toggle'));
    expect(screen.getByTestId('todo-task-toggle').checked).toEqual(true);
    fireEvent.click(screen.getByTestId('todo-task-toggle'));
    expect(screen.getByTestId('todo-task-toggle').checked).toEqual(false);
  });

  test('Testing todo removing', () => {
    render(<App />);
    const inputSumbit = screen.getByTestId('task-input-submit');
    const newTaskInput = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(newTaskInput, {
      target: { value: 'test1' },
    });
    fireEvent.click(inputSumbit);
    fireEvent.change(newTaskInput, {
      target: { value: 'test2' },
    });
    fireEvent.click(inputSumbit);
    expect(screen.getAllByTestId('todo-task')).toHaveLength(2);
    const taskLabels = screen.getAllByTestId('todo-task-toggle');
    fireEvent.click(taskLabels[0]);
    fireEvent.click(screen.getByTestId('filter-clear'));
    const tasks = screen.getAllByTestId('todo-task');
    const tasksText = screen.getAllByTestId('todo-task-text');
    expect(tasks).toHaveLength(1);
    expect(tasksText[0]).toHaveTextContent('test2');
  });

  test('Testing todo filtering', () => {
    render(<App />);
    const inputSumbit = screen.getByTestId('task-input-submit');
    const newTaskInput = screen.getByPlaceholderText(/What needs to be done?/i);
    const btnAll = screen.getByTestId('filter-all');
    const btnCompleted = screen.getByTestId('filter-completed');
    const btnActive = screen.getByTestId('filter-active');
    fireEvent.change(newTaskInput, {
      target: { value: 'test1' },
    });
    fireEvent.click(inputSumbit);
    fireEvent.change(newTaskInput, {
      target: { value: 'test2' },
    });
    fireEvent.click(inputSumbit);
    fireEvent.change(newTaskInput, {
      target: { value: 'test3' },
    });
    fireEvent.click(inputSumbit);
    expect(screen.getAllByTestId('todo-task')).toHaveLength(3);
    fireEvent.click(screen.getAllByTestId('todo-task-toggle')[0]);
    fireEvent.click(btnCompleted);
    expect(screen.getAllByTestId('todo-task')).toHaveLength(1);
    expect(screen.getByTestId('filter-count')).toHaveTextContent(
      /2 items left/i
    );
    fireEvent.click(btnActive);
    expect(screen.getAllByTestId('todo-task')).toHaveLength(2);
    fireEvent.click(btnAll);
    expect(screen.getAllByTestId('todo-task')).toHaveLength(3);
  });
});
