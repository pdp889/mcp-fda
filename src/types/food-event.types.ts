import { FDAResult, FDASearch } from './fda.types';
import { AgeUnit, Gender, ProductRole, Outcome } from '../enums/food-event.enums';

export interface FoodEventResult extends FDAResult {
  results: Array<FoodEventResponse>;
}

export interface FoodEventResponse {
  consumer?: {
    age?: string;
    age_unit?: AgeUnit;
    gender?: Gender;
  };
  date_created?: string;
  date_started?: string;
  outcomes?: Outcome[];
  products?: Array<{
    industry_code?: string;
    industry_name?: string;
    name_brand?: string;
    role?: ProductRole;
  }>;
  reactions?: string[];
  report_number?: string;
}

export interface FoodEventSearch extends FDASearch {
  'consumer.age'?: string;
  'consumer.age_unit'?: AgeUnit;
  'consumer.gender'?: Gender;
  date_created?: string;
  date_started?: string;
  outcomes?: Outcome[];
  'products.industry_code'?: string;
  'products.industry_name'?: string;
  'products.name_brand'?: string;
  'products.role'?: ProductRole;
  reactions?: string[];
  report_number?: string;
}
