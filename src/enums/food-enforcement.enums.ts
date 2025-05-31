export const RECALL_STATUS = {
  ON_GOING: 'On-Going',
  COMPLETED: 'Completed',
  TERMINATED: 'Terminated',
  PENDING: 'Pending',
} as const;

export type RecallStatus = (typeof RECALL_STATUS)[keyof typeof RECALL_STATUS];

export const PRODUCT_TYPE = {
  DRUGS: 'Drugs',
  DEVICES: 'Devices',
  FOOD: 'Food',
} as const;

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export const RECALL_CLASSIFICATION = {
  CLASS_I: 'Class I',
  CLASS_II: 'Class II',
  CLASS_III: 'Class III',
} as const;

export type RecallClassification =
  (typeof RECALL_CLASSIFICATION)[keyof typeof RECALL_CLASSIFICATION];
