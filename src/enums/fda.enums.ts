import { z } from 'zod';

// Utility function to create Zod enums from TypeScript enums
export const createZodEnum = <T extends { [key: string]: string }>(
  enumObj: T
): z.ZodEnum<[string, ...string[]]> => {
  return z.enum(Object.values(enumObj) as [string, ...string[]]);
};

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];
