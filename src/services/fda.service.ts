import { logger } from '../utils/logger';
import { FDAPayload } from '../types/fda.types';

export abstract class FDAService {
  protected readonly MAX_LIMIT = 1000;
  protected readonly MAX_SKIP = 25000;
  protected readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (!this.apiKey) {
      logger.warn('FDA API key not found - rate limits will be restricted');
    } else {
      logger.info('FDA API key loaded successfully');
    }
  }

  protected processParams(params: FDAPayload): Record<string, string | number | undefined> {
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

  protected handleError(error: unknown, context: string): never {
    logger.error(`Error ${context}: ${error}`);
    throw new Error(
      `Failed to ${context}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
