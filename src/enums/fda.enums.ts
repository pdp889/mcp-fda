import { z } from 'zod';

// Utility function to create Zod enums from TypeScript enums
export const createZodEnum = <T extends Readonly<Record<string, string>>>(
  enumObj: T
): z.ZodEnum<[string, ...string[]]> => {
  const values = Object.values(enumObj) as [string, ...string[]];
  return z.enum(values);
};

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];
