import { FC, memo, useContext } from 'react';
import { ISetFilter } from '../../interfaces';
import { FilterContext } from '../../context';

import './FilterButtons.css';

const FilterButtons: FC<ISetFilter> = memo(({ setFilter }) => {
  const filter = useContext(FilterContext);

  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'All' ? 'selected' : ''}
          onClick={() => setFilter('All')}
          type="button"
          data-testid="filter-all"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'Active' ? 'selected' : ''}
          onClick={() => setFilter('Active')}
          type="button"
          data-testid="filter-active"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'Completed' ? 'selected' : ''}
          onClick={() => setFilter('Completed')}
          type="button"
          data-testid="filter-completed"
        >
          Completed
        </button>
      </li>
    </ul>
  );
});

export default FilterButtons;
