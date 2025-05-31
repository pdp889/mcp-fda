export const AGE_UNIT = {
  DAYS: 'Day(s)',
  WEEKS: 'Week(s)',
  MONTHS: 'Month(s)',
  YEARS: 'Year(s)',
  DECADES: 'Decade(s)',
  NOT_AVAILABLE: 'Not Available',
} as const;

export type AgeUnit = (typeof AGE_UNIT)[keyof typeof AGE_UNIT];

export const GENDER = {
  FEMALE: 'Female',
  MALE: 'Male',
  NOT_AVAILABLE: 'Not Available',
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const PRODUCT_ROLE = {
  SUSPECT: 'Suspect',
  CONCOMITANT: 'Concomitant',
  NOT_AVAILABLE: 'Not Available',
} as const;

export type ProductRole = (typeof PRODUCT_ROLE)[keyof typeof PRODUCT_ROLE];

export const OUTCOME = {
  NON_SERIOUS: 'NON-SERIOUS INJURIES/ ILLNESS',
  OTHER_SERIOUS: 'OTHER SERIOUS (IMPORTANT MEDICAL EVENTS)',
  VISITED_HCP: 'VISITED A HEALTH CARE PROVIDER',
  HOSPITALIZATION: 'HOSPITALIZATION',
  VISITED_ER: 'VISITED AN ER',
  LIFE_THREATENING: 'LIFE THREATENING',
  INTERVENTION_REQUIRED: 'REQ. INTERVENTION TO PRVNT PERM. IMPRMNT.',
  SERIOUS: 'SERIOUS INJURIES/ ILLNESS',
  DISABILITY: 'DISABILITY',
  DEATH: 'DEATH',
  NONE: 'NONE',
  OTHER: 'OTHER',
  CONGENITAL: 'CONGENITAL ANOMALY',
} as const;

export type Outcome = (typeof OUTCOME)[keyof typeof OUTCOME];
