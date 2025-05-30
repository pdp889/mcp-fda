import { FDAPayload } from '../types/fda.types';
import { FoodEnforcementSearch } from '../types/food-enforcement.types';

export const mapToPayload = (params : any): FDAPayload => {
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
  if (rest.recall_initiation_date_start || rest.recall_initiation_date_end) {
    const start = rest.recall_initiation_date_start || '1900-01-01';
    const end = rest.recall_initiation_date_end || new Date().toISOString().split('T')[0];
    rest.recall_initiation_date = `[${start.replace(/-/g, '')} TO ${end.replace(/-/g, '')}]`;
  }

  // Handle report date range
  if (rest.report_date_start || rest.report_date_end) {
    const start = rest.report_date_start || '1900-01-01';
    const end = rest.report_date_end || new Date().toISOString().split('T')[0];
    rest.report_date = `[${start.replace(/-/g, '')} TO ${end.replace(/-/g, '')}]`;
  }

  delete rest.recall_initiation_date_start;
  delete rest.recall_initiation_date_end;
  delete rest.report_date_start;
  delete rest.report_date_end;
  return rest as FoodEnforcementSearch;
};
