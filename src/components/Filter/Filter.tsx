import { FC, memo } from 'react';

import './Filter.css';
import FilterButtons from '../FilterButtons/FilterButtons';
import { ISetFilter } from '../../interfaces';

interface IFilter extends ISetFilter {
  clearCompleted: () => void;
  itemsLeft: number;
}

const Filter: FC<IFilter> = memo(({ setFilter, clearCompleted, itemsLeft }) => {
  return (
    <div className="filter" data-testid="filter">
      <span
        data-testid="filter-count"
        className="todo-count"
      >{`${itemsLeft} items left`}</span>
      <FilterButtons setFilter={setFilter} />
      <button
        onClick={clearCompleted}
        className="clear-completed"
        type="button"
        data-testid="filter-clear"
      >
        Clear completed
      </button>
    </div>
  );
});

export default Filter;
