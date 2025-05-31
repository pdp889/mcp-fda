import axios from 'axios';
import { logger } from '../utils/logger';
import { FoodEventResult } from '../types/food-event.types';
import { FDAPayload } from '../types/fda.types';
import { FDAService } from './fda.service';

const EVENT_URL = 'https://api.fda.gov/food/event.json';

export class FoodEventService extends FDAService {
  constructor(apiKey: string) {
    super(apiKey);
  }

  async search(params: FDAPayload): Promise<FoodEventResult> {
    try {
      const requestParams = this.processParams(params);
      logger.info(`Searching Food Events with params: ${JSON.stringify(requestParams)}`);

      const response = await axios.get<FoodEventResult>(EVENT_URL, {
        params: requestParams,
      });

      return response.data;
    } catch (error) {
      this.handleError(error, 'searching food events');
    }
  }
}
