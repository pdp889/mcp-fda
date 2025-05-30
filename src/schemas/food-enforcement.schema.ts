import { z } from 'zod';

export const FoodEnforcementToolSchema = {
  recall_number: z
    .string()
    .optional()
    .describe('Search by recall number. Use * for wildcard matching.'),
  reason_for_recall: z
    .string()
    .optional()
    .describe('Search by reason for recall. Use * for wildcard matching.'),
  status: z
    .string()
    .optional()
    .describe(
      'Search by status. Use * for wildcard matching. Can be "Ongoing", "Terminated", "Completed", "Pending Classification"'
    ),
  distribution_pattern: z
    .string()
    .optional()
    .describe('Search by distribution pattern. Use * for wildcard matching.'),
  product_quantity: z
    .string()
    .optional()
    .describe('Search by product quantity. Use * for wildcard matching.'),
  recall_initiation_date_start: z
    .string()
    .optional()
    .describe('Start date for recall initiation date range (YYYY-MM-DD).'),
  recall_initiation_date_end: z
    .string()
    .optional()
    .describe('End date for recall initiation date range (YYYY-MM-DD).'),

  state: z.string().optional().describe('Search by state. Use 2 letter state code.'),
  event_id: z.string().optional().describe('Search by event ID. Use * for wildcard matching.'),
  product_type: z
    .string()
    .optional()
    .describe('Search by product type. Use * for wildcard matching.'),
  product_description: z
    .string()
    .optional()
    .describe('Search by product description. Use * for wildcard matching.'),
  country: z.string().optional().describe('Search by country. Use * for wildcard matching.'),
  city: z.string().optional().describe('Search by city. Use * for wildcard matching.'),
  recalling_firm: z
    .string()
    .optional()
    .describe('Search by recalling firm. Use * for wildcard matching.'),

  report_date_start: z
    .string()
    .optional()
    .describe('Start date for report date range (YYYY-MM-DD).'),
  report_date_end: z.string().optional().describe('End date for report date range (YYYY-MM-DD).'),

  voluntary_mandated: z
    .string()
    .optional()
    .describe('Search by voluntary/mandated status. Use * for wildcard matching.'),
  classification: z
    .string()
    .optional()
    .describe('Search by classification. Use * for wildcard matching.'),
  code_info: z.string().optional().describe('Search by code info. Use * for wildcard matching.'),
  initial_firm_notification: z
    .string()
    .optional()
    .describe('Search by initial firm notification. Use * for wildcard matching.'),

  limit: z.number().optional().describe('Maximum number of results to return (max 1000).'),
  skip: z.number().optional().describe('Number of results to skip (max 25000).'),
  sort_field: z.string().optional().describe('Field to sort results by.'),
  sort_direction: z.enum(['asc', 'desc']).optional().describe('Sort direction (asc or desc).'),
} as const;
