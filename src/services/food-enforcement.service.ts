import axios from 'axios';
import { logger } from '../utils/logger';
import { FoodEnforcementResult } from '../types/food-enforcement.types';
import { FDAPayload } from '../types/fda.types';
import { FDAService } from './fda.service';

const ENFORCEMENT_URL = 'https://api.fda.gov/food/enforcement.json';

export class FoodEnforcementService extends FDAService {
  constructor(apiKey: string) {
    super(apiKey);
  }

  async search(params: FDAPayload): Promise<FoodEnforcementResult> {
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
}
