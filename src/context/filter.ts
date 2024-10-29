import { createContext } from 'react';
import { filters } from '../types';

const FilterContext = createContext<filters>('All');

export default FilterContext;
