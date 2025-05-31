import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger';
import { FDAPayload, FDAResult } from '../types/fda.types';
import { z } from 'zod';

export abstract class FDATool<T extends FDAResult & { results: Array<any> }> {
  protected server: McpServer;
  protected toolName: string;
  protected toolDescription: string;
  protected schema: z.ZodRawShape;

  protected constructor(
    server: McpServer,
    toolName: string,
    toolDescription: string,
    schema: z.ZodRawShape
  ) {
    this.server = server;
    this.toolName = toolName;
    this.toolDescription = toolDescription;
    this.schema = schema;
  }

  protected registerTool(): void {
    this.server.tool(
      this.toolName,
      this.toolDescription,
      this.schema,
      async (params: Record<string, unknown>) => {
        try {
          logger.info(`Received ${this.toolName} search request`, { params });
          const startTime = Date.now();

          const fdaPayload = this.mapToPayload(params);
          const results = await this.execute(fdaPayload);

          const duration = Date.now() - startTime;
          logger.info(`${this.toolName} search completed`, {
            duration,
            resultCount: results.results.length,
            total: results.meta.results.total,
          });

          return {
            content: [
              {
                type: 'text',
                text: this.formatResults(results),
              },
            ],
            _meta: {
              total: results.meta.results.total,
              limit: results.meta.results.limit,
              skip: results.meta.results.skip,
            },
          };
        } catch (error) {
          logger.error(`Error processing ${this.toolName} request`, { error, params });

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

  protected abstract execute(_params: FDAPayload): Promise<T>;
  protected abstract formatResults(_results: T): string;
  protected abstract mapToPayload(_params: Record<string, unknown>): FDAPayload;
}
