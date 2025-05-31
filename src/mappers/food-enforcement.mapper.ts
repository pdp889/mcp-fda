import { FDAPayload } from '../types/fda.types';
import { FoodEnforcementSearch } from '../types/food-enforcement.types';
import { convertDateRange } from './fda.mapper';

export const mapToPayload = (params: any): FDAPayload => {
  const { sort_field, sort_direction, limit, skip, ...rest } = params;
  const search = convertToFoodEnforcementSearch(rest);

  return {
    search: search,
    limit: limit,
    skip: skip,
    sort:
      sort_field && sort_direction ? { field: sort_field, direction: sort_direction } : undefined,
  };
};

const convertToFoodEnforcementSearch = (rest: any): FoodEnforcementSearch => {
  // Handle recall initiation date range
  rest.recall_initiation_date = convertDateRange(
    rest.recall_initiation_date_start,
    rest.recall_initiation_date_end
  );
  delete rest.recall_initiation_date_start;
  delete rest.recall_initiation_date_end;

  rest.report_date = convertDateRange(rest.report_date_start, rest.report_date_end);
  delete rest.report_date_start;
  delete rest.report_date_end;

  rest.center_classification_date = convertDateRange(
    rest.center_classification_date_start,
    rest.center_classification_date_end
  );
  delete rest.center_classification_date_start;
  delete rest.center_classification_date_end;

  rest.termination_date = convertDateRange(rest.termination_date_start, rest.termination_date_end);
  delete rest.termination_date_start;
  delete rest.termination_date_end;
  delete rest.termination_date_end;

  return rest as FoodEnforcementSearch;
};
