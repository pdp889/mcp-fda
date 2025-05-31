export interface FDASort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FDAMeta {
  disclaimer: string;
  terms: string;
  license: string;
  last_updated: string;
  results: {
    skip: number;
    limit: number;
    total: number;
  };
}

export interface FDAPayload {
  search?: FDASearch;
  limit?: number;
  skip?: number;
  sort?: FDASort;
}

export interface FDASearch {}

export interface FDAResult {
  meta: FDAMeta;
}
