import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { FoodEventService } from '../services/food-event.service';
import { FDAPayload } from '../types/fda.types';
import { FDATool } from './fda.tool';
import { z } from 'zod';
import { FoodEventResult } from '../types/food-event.types';
import { mapToPayload } from '../mappers/food-event.mapper';

export class FoodEventTool extends FDATool<FoodEventResult> {
  private service: FoodEventService;

  constructor(
    server: McpServer,
    foodEventService: FoodEventService,
    toolName: string,
    toolDescription: string,
    schema: z.ZodRawShape
  ) {
    super(server, toolName, toolDescription, schema);
    this.service = foodEventService;
  }

  register(): void {
    this.registerTool();
  }

  protected async execute(params: FDAPayload): Promise<FoodEventResult> {
    return this.service.search(params);
  }

  protected formatResults(results: FoodEventResult): string {
    if (!results.results.length) {
      return 'No food event reports found matching your criteria.';
    }

    const formattedResults = results.results.map((event) => {
      const date = event.date_created || 'No date provided';
      const products = event.products?.map((p) => p.name_brand).join(', ') || 'No products listed';
      const outcomes = event.outcomes?.join(', ') || 'No outcomes listed';
      const reactions = event.reactions?.join(', ') || 'No reactions listed';

      return `Date: ${date}\nProducts: ${products}\nOutcomes: ${outcomes}\nReactions: ${reactions}\n`;
    });

    return `Found ${results.meta.results.total} food event reports:\n\n${formattedResults.join('\n')}`;
  }

  protected mapToPayload(params: Record<string, unknown>): FDAPayload {
    return mapToPayload(params);
  }
}
