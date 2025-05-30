import axios from 'axios';
import { logger } from '../utils/logger';
import { FoodEnforcementResult } from '../types/food-enforcement.types';
import { FDAPayload

 } from '../types/fda.types';
const ENFORCEMENT_URL = 'https://api.fda.gov/food/enforcement.json';

export class FoodEnforcementService {
  private readonly MAX_LIMIT = 1000;
  private readonly MAX_SKIP = 25000;
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (!this.apiKey) {
      logger.warn('FDA API key not found - rate limits will be restricted');
    } else {
      logger.info('FDA API key loaded successfully');
    }
  }

  async searchEnforcement(params: FDAPayload): Promise<FoodEnforcementResult> {
    try {
      const requestParams = this.processParams(params);
      logger.info(`Searching Food Enforcement with params: ${JSON.stringify(requestParams)}`);

      const response = await axios.get<FoodEnforcementResult>(ENFORCEMENT_URL, {
        params: requestParams,
      });

      return response.data;
    } catch (error) {
      this.handleError(error, 'searching food enforcement');
    }
  }

  private processParams(params: FDAPayload): Record<string, string | number | undefined> {
    if (params.limit && params.limit > this.MAX_LIMIT) {
      logger.warn(
        `Limit ${params.limit} exceeds maximum of ${this.MAX_LIMIT}, using ${this.MAX_LIMIT}`
      );
      params.limit = this.MAX_LIMIT;
    }

    if (params.skip && params.skip > this.MAX_SKIP) {
      logger.warn(
        `Skip ${params.skip} exceeds maximum of ${this.MAX_SKIP}, using ${this.MAX_SKIP}`
      );
      params.skip = this.MAX_SKIP;
    }

    const searchConditions = params.search
      ? Object.entries(params.search)
          .filter(([, value]) => value !== undefined && value !== '')
          .map(([field, value]) => `${field}:${value}`)
          .join(' AND ')
      : undefined;

    logger.info(`Search conditions: ${searchConditions}`);

    return {
      api_key: this.apiKey,
      limit: params.limit,
      skip: params.skip,
      search: searchConditions,
      sort: params.sort ? `${params.sort.field}:${params.sort.direction}` : undefined,
    };
  }

  private handleError(error: unknown, context: string): never {
    logger.error(`Error ${context}: ${error}`);
    throw new Error(
      `Failed to ${context}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
