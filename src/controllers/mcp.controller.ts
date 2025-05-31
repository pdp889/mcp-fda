import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger } from '../utils/logger';
import { FoodEnforcementService } from '../services/food-enforcement.service';
import { FoodEventService } from '../services/food-event.service';
import { FoodEnforcementTool } from '../tools/food-enforcement.tool';
import { FoodEventTool } from '../tools/food-event.tool';
import { mcpConfig } from '../configs/mcp.config';
import { FoodEnforcementSchema } from '../schemas/food-enforcement.schema';
import { FoodEventSchema } from '../schemas/food-event.schema';

export class McpController {
  private server: McpServer;
  private foodEnforcementService: FoodEnforcementService;
  private foodEventService: FoodEventService;
  private foodEnforcementTool: FoodEnforcementTool;
  private foodEventTool: FoodEventTool;

  constructor(apiKey: string) {
    this.foodEnforcementService = new FoodEnforcementService(apiKey);
    this.foodEventService = new FoodEventService(apiKey);

    this.server = new McpServer(mcpConfig);

    this.foodEnforcementTool = new FoodEnforcementTool(
      this.server,
      this.foodEnforcementService,
      'search-fda-food-enforcement',
      'Search for food enforcement actions by several field types',
      FoodEnforcementSchema
    );
    this.foodEnforcementTool.register();

    this.foodEventTool = new FoodEventTool(
      this.server,
      this.foodEventService,
      'search-fda-food-event',
      'Search for food event reports by several field types',
      FoodEventSchema
    );
    this.foodEventTool.register();

    this.startServer();
  }

  private startServer(): void {
    // Start the server with stdio transport
    const transport = new StdioServerTransport();
    this.server
      .connect(transport)
      .then(() => {
        if (process.env.NODE_ENV === 'test') {
          console.log('Server started');
        }
      })
      .catch((error: Error) => {
        logger.error('Failed to start MCP server:', error);
        process.exit(1);
      });
  }
}
