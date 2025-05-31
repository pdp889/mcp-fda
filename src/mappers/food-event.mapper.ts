import { FDAPayload } from '../types/fda.types';
import { FoodEventSearch } from '../types/food-event.types';
import { convertDateRange } from './fda.mapper';

export const mapToPayload = (params: any): FDAPayload => {
  const { sort_field, sort_direction, limit, skip, ...rest } = params;
  const search = convertToFoodEventSearch(rest);

  return {
    search: search,
    limit: limit,
    skip: skip,
    sort:
      sort_field && sort_direction ? { field: sort_field, direction: sort_direction } : undefined,
  };
};

const convertToFoodEventSearch = (rest: any): FoodEventSearch => {
  // Handle date ranges
  rest.date_created = convertDateRange(rest.date_created_start, rest.date_created_end);
  delete rest.date_created_start;
  delete rest.date_created_end;

  rest.date_started = convertDateRange(rest.date_started_start, rest.date_started_end);
  delete rest.date_started_start;
  delete rest.date_started_end;

  return rest as FoodEventSearch;
};
