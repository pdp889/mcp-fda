import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { FoodEnforcementService } from '../services/food-enforcement.service';
import { FoodEnforcementResult } from '../types/food-enforcement.types';
import { FDAPayload } from '../types/fda.types';
import { FDATool } from './fda.tool';
import { z } from 'zod';
import { mapToPayload } from '../mappers/food-enforcement.mapper';

export class FoodEnforcementTool extends FDATool<FoodEnforcementResult> {
  private service: FoodEnforcementService;

  constructor(
    server: McpServer,
    foodEnforcementService: FoodEnforcementService,
    toolName: string,
    toolDescription: string,
    schema: z.ZodRawShape
  ) {
    super(server, toolName, toolDescription, schema);
    this.service = foodEnforcementService;
  }

  register(): void {
    this.registerTool();
  }

  protected async execute(params: FDAPayload): Promise<FoodEnforcementResult> {
    return this.service.search(params);
  }

  protected formatResults(results: FoodEnforcementResult): string {
    if (!results.results.length) {
      return 'No food enforcement actions found matching your criteria.';
    }

    const formattedResults = results.results.map((result) => {
      const date = result.recall_initiation_date || 'No date provided';
      const reason = result.reason_for_recall || 'No reason provided';
      const product = result.product_description || 'No product description';
      const status = result.status || 'Unknown status';

      return `Date: ${date}\nProduct: ${product}\nReason: ${reason}\nStatus: ${status}\n`;
    });

    return `Found ${results.meta.results.total} food enforcement actions:\n\n${formattedResults.join('\n')}`;
  }

  protected mapToPayload(params: Record<string, unknown>): FDAPayload {
    return mapToPayload(params);
  }
}
