import { z } from 'zod';
import {
  RECALL_STATUS,
  PRODUCT_TYPE,
  RECALL_CLASSIFICATION,
} from '../enums/food-enforcement.enums';
import { SORT_DIRECTION, createZodEnum } from '../enums/fda.enums';

export const FoodEnforcementSchema = {
  // Recall information
  recall_number: z
    .string()
    .optional()
    .describe(
      'A numerical designation assigned by FDA to a specific recall event used for tracking purposes. Use * for wildcard searching.'
    ),
  reason_for_recall: z
    .string()
    .optional()
    .describe(
      'Information describing how the product is defective and violates the FD&C Act or related statutes. Use * for wildcard searching.'
    ),
  status: createZodEnum(RECALL_STATUS).optional().describe('The current status of the recall.'),
  voluntary_mandated: z
    .string()
    .optional()
    .describe('Describes who initiated the recall (voluntary or mandated by FDA). Use * for wildcard searching.'),

  // Product information
  product_type: createZodEnum(PRODUCT_TYPE)
    .optional()
    .describe('The type of product being recalled.'),
  product_description: z
    .string()
    .optional()
    .describe('Brief description of the product being recalled. Use * for wildcard searching.'),
  product_quantity: z
    .string()
    .optional()
    .describe('The amount of defective product subject to recall. Use * for wildcard searching.'),
  classification: createZodEnum(RECALL_CLASSIFICATION)
    .optional()
    .describe(
      'Numerical designation (I, II, or III) that indicates the relative degree of health hazard.'
    ),

  // Distribution information
  distribution_pattern: z
    .string()
    .optional()
    .describe('General area of initial distribution such as states, countries, or "nationwide". Use * for wildcard searching.'),
  code_info: z
    .string()
    .optional()
    .describe(
      'A list of all lot and/or serial numbers, product numbers, packer or manufacturer numbers, sell or use by dates, etc. Use * for wildcard searching.'
    ),

  // Firm information
  recalling_firm: z
    .string()
    .optional()
    .describe('The firm that initiates a recall or has primary responsibility for the product. Use * for wildcard searching.'),
  address_1: z.string().optional().describe('Primary address of the recalling firm. Use * for wildcard searching.'),
  address_2: z.string().optional().describe('Secondary address of the recalling firm. Use * for wildcard searching.'),
  city: z.string().optional().describe('The city in which the recalling firm is located. Use * for wildcard searching.'),
  state: z
    .string()
    .optional()
    .describe(
      'The U.S. state in which the recalling firm is located. Use the two-letter state code. Use * for wildcard searching.'
    ),
  country: z
    .string()
    .optional()
    .describe(
      'The country in which the recalling firm is located. Use the two-letter country code. Use * for wildcard searching.'
    ),

  // Dates
  recall_initiation_date_start: z
    .string()
    .optional()
    .describe('Start date for recall initiation date range (YYYY-MM-DD).'),
  recall_initiation_date_end: z
    .string()
    .optional()
    .describe('End date for recall initiation date range (YYYY-MM-DD).'),
  report_date_start: z
    .string()
    .optional()
    .describe('Start date for report date range (YYYY-MM-DD).'),
  report_date_end: z.string().optional().describe('End date for report date range (YYYY-MM-DD).'),
  center_classification_date_start: z
    .string()
    .optional()
    .describe('Start date for center classification date range (YYYY-MM-DD).'),
  center_classification_date_end: z
    .string()
    .optional()
    .describe('End date for center classification date range (YYYY-MM-DD).'),
  termination_date_start: z
    .string()
    .optional()
    .describe('Start date for termination date range (YYYY-MM-DD).'),
  termination_date_end: z
    .string()
    .optional()
    .describe('End date for termination date range (YYYY-MM-DD).'),

  // Additional information
  event_id: z
    .string()
    .optional()
    .describe(
      'A numerical designation assigned by FDA to a specific recall event used for tracking purposes. Use * for wildcard searching.'
    ),
  initial_firm_notification: z
    .string()
    .optional()
    .describe(
      'The method(s) by which the firm initially notified the public or their consignees of a recall. Use * for wildcard searching.'
    ),

  // Pagination and sorting
  limit: z.number().optional().describe('Maximum number of results to return (max 1000).'),
  skip: z.number().optional().describe('Number of results to skip (max 25000).'),
  sort_field: z.string().optional().describe('Field to sort results by.'),
  sort_direction: createZodEnum(SORT_DIRECTION)
    .optional()
    .describe('Sort direction (asc or desc).'),
} as const;
