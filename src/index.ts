import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get API key from environment
const apiKey = process.env.FDA_API_KEY || '';

import { McpController } from './controllers/mcp.controller';
// Start the MCP server
new McpController(apiKey);
