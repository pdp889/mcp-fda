import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger } from '../utils/logger';
import { FoodEnforcementService } from '../services/food-enforcement.service';
import { FoodEnforcementToolSchema } from '../schemas/food-enforcement.schema';
import { mapToPayload } from '../mappers/food-enforcement.mapper';

export class McpController {
  private server: McpServer;
  private foodEnforcementService: FoodEnforcementService;

  constructor(apiKey: string) {
    this.foodEnforcementService = new FoodEnforcementService(apiKey);

    this.server = new McpServer({
      name: 'FDA API',
      version: '1.0.0',
      description:
        'A service for querying the FDA API. Supports searching by various fields, date ranges, and wildcard matching.',
      examples: [
        {
          name: 'Search Food Enforcement by Product Type',
          params: {
            product_type: 'Food',
            limit: 10,
          },
        },
        {
          name: 'Search Food Enforcement by Date Range',
          params: {
            recall_initiation_date_start: '2024-01-01',
            recall_initiation_date_end: '2024-12-31',
            limit: 10,
          },
        },
        {
          name: 'Wildcard Food Enforcement Search',
          params: {
            product_description: 'chocolate*',
            limit: 10,
          },
        },
      ],
    });

    this.setUp();
    this.startServer();
  }

  private setUp() : void {
    this.server.tool(
      'search-food-enforcement',
      'Search for food enforcement actions by several field types',
      FoodEnforcementToolSchema,
      async (params) => {
        try {
          logger.info('Received Food Enforcement search request', { params });
          const startTime = Date.now();

          const fdaPayload = mapToPayload(params);
          const results = await this.foodEnforcementService.searchEnforcement(fdaPayload);

          const duration = Date.now() - startTime;
          logger.info('Food Enforcement search completed', {
            duration,
            resultCount: results.results.length,
            total: results.meta.results.total,
          });

          return {
            content: [
              {
                type: 'text',
                text: `Found ${results.meta.results.total} results (showing ${results.results.length}):\n\n${results.results
                  .map(
                    (result) =>
                      `Recall #${result.recall_number} (${result.recall_initiation_date}):\n` +
                      `Product: ${result.product_description}\n` +
                      `Reason: ${result.reason_for_recall}\n` +
                      `Status: ${result.status}\n` +
                      `Firm: ${result.recalling_firm}\n`
                  )
                  .join('\n---\n')}`,
              },
            ],
            _meta: {
              total: results.meta.results.total,
              limit: results.meta.results.limit,
              skip: results.meta.results.skip,
            },
          };
        } catch (error) {
          logger.error('Error processing FDA search request', { error, params });

          return {
            content: [
              {
                type: 'text',
                text: `Failed to search FDA database: ${error instanceof Error ? error.message : String(error)}`,
              },
            ],
          };
        }
      }
    );
  }

  private startServer() : void {
    // Start the server with stdio transport
    const transport = new StdioServerTransport();
    this.server.connect(transport).then(() => {
      if (process.env.NODE_ENV === 'test') {
        console.log('Server started');
      }
    }).catch((error: Error) => {
      logger.error('Failed to start MCP server:', error);
      process.exit(1);
    });
  }
}
