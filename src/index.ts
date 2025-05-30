import dotenv from 'dotenv';
import { McpController } from './controllers/mcp.controller';

// Load environment variables
dotenv.config();

// Get API key from environment
const apiKey = process.env.FDA_API_KEY || '';

// Start the MCP server
new McpController(apiKey);
