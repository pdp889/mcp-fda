import { FDAResult, FDASearch } from './fda.types';
import { RecallStatus, ProductType, RecallClassification } from '../enums/food-enforcement.enums';

export interface FoodEnforcementResult extends FDAResult {
  results: Array<FoodEnforcementResponse>;
}

export interface FoodEnforcementResponse {
  recall_number?: string;
  reason_for_recall?: string;
  status?: RecallStatus;
  distribution_pattern?: string;
  product_quantity?: string;
  recall_initiation_date?: string;
  state?: string;
  event_id?: string;
  product_type?: ProductType;
  product_description?: string;
  country?: string;
  city?: string;
  recalling_firm?: string;
  report_date?: string;
  voluntary_mandated?: string;
  classification?: RecallClassification;
  code_info?: string;
  initial_firm_notification?: string;
  openfda?: Record<string, unknown>;
  address_1?: string;
  address_2?: string;
  postal_code?: string;
  center_classification_date?: string;
  termination_date?: string;
}

export interface FoodEnforcementSearch extends FDASearch {
  recall_number?: string;
  reason_for_recall?: string;
  status?: RecallStatus;
  distribution_pattern?: string;
  product_quantity?: string;
  recall_initiation_date?: string;
  state?: string;
  event_id?: string;
  product_type?: ProductType;
  product_description?: string;
  country?: string;
  city?: string;
  recalling_firm?: string;
  report_date?: string;
  voluntary_mandated?: string;
  classification?: RecallClassification;
  code_info?: string;
  initial_firm_notification?: string;
  center_classification_date?: string;
  termination_date?: string;
}
