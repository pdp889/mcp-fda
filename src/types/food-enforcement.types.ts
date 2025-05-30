import { FDAMeta, FDASearch } from "./fda.types";

export interface FoodEnforcementResult {
  meta: FDAMeta;
  results: Array<FoodEnforcementResponse>;
}

export interface FoodEnforcementResponse {
  recall_number?: string;
  reason_for_recall?: string;
  status?: string;
  distribution_pattern?: string;
  product_quantity?: string;
  recall_initiation_date?: string;
  state?: string;
  event_id?: string;
  product_type?: string;
  product_description?: string;
  country?: string;
  city?: string;
  recalling_firm?: string;
  report_date?: string;
  voluntary_mandated?: string;
  classification?: string;
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
  status?: string;
  distribution_pattern?: string;
  product_quantity?: string;
  recall_initiation_date?: string;
  state?: string;
  event_id?: string;
  product_type?: string;
  product_description?: string;
  country?: string;
  city?: string;
  recalling_firm?: string;
  report_date?: string;
  voluntary_mandated?: string;
  classification?: string;
  code_info?: string;
  initial_firm_notification?: string;
}