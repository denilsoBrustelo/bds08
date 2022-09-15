import { FilterData } from './../types';
import axios from 'axios';

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL
});

export const buildFilterParams = (
  filterData?: FilterData,
  extraParams?: Record<string, unknown>
) => {
  return {
    store: filterData?.store,
    ...extraParams
  };
};
