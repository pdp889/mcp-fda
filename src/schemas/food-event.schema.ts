import { z } from 'zod';
import { AGE_UNIT, GENDER, PRODUCT_ROLE, OUTCOME } from '../enums/food-event.enums';
import { SORT_DIRECTION, createZodEnum } from '../enums/fda.enums';

export const FoodEventSchema = {
  // Consumer information
  'consumer.age': z
    .string()
    .optional()
    .describe('The reported age of the consumer at the time of the adverse event report.'),
  'consumer.age_unit': createZodEnum(AGE_UNIT)
    .optional()
    .describe('The unit in which the age of the consumer is expressed.'),
  'consumer.gender': createZodEnum(GENDER)
    .optional()
    .describe('The reported gender of the consumer.'),

  // Dates
  date_created_start: z
    .string()
    .optional()
    .describe('Start date for date created range (YYYY-MM-DD).'),
  date_created_end: z.string().optional().describe('End date for date created range (YYYY-MM-DD).'),
  date_started_start: z
    .string()
    .optional()
    .describe('Start date for date started range (YYYY-MM-DD).'),
  date_started_end: z.string().optional().describe('End date for date started range (YYYY-MM-DD).'),

  // Outcomes
  outcomes: z
    .array(createZodEnum(OUTCOME))
    .optional()
    .describe('The outcome or consequence of the adverse event.'),

  // Products
  'products.industry_code': z
    .string()
    .optional()
    .describe('The FDA industry code for the product.'),
  'products.industry_name': z
    .string()
    .optional()
    .describe('The FDA industry name associated with the product.'),
  'products.name_brand': z.string().optional().describe('The reported brand name of the product.'),
  'products.role': createZodEnum(PRODUCT_ROLE)
    .optional()
    .describe('The reported role of the product in the adverse event report.'),

  // Reactions
  reactions: z
    .array(z.string())
    .optional()
    .describe('MedDRA terms for the reactions (in British English).'),

  // Report information
  report_number: z.string().optional().describe('The report number.'),

  // Pagination and sorting
  limit: z.number().optional().describe('Maximum number of results to return (max 1000).'),
  skip: z.number().optional().describe('Number of results to skip (max 25000).'),
  sort_field: z.string().optional().describe('Field to sort results by.'),
  sort_direction: createZodEnum(SORT_DIRECTION)
    .optional()
    .describe('Sort direction (asc or desc).'),
} as const;
