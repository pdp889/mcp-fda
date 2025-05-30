# FDA Food Enforcement API MCP Service

A Model Context Protocol (MCP) service that provides access to the FDA Food Enforcement API. This service allows querying FDA enforcement actions with support for various search parameters, date ranges, and wildcard matching.

> Note: This service currently focuses on the FDA Food Enforcement API. Future versions will expand to include other FDA API endpoints.

## Features

- Search FDA food enforcement actions by multiple fields
- Support for date range filtering
- Wildcard matching in search terms
- Pagination support
- Sorting capabilities
- Comprehensive error handling
- Integration test suite

## Prerequisites

- Node.js (v18 or higher)
- npm
- FDA API Key (get one from [FDA API Portal](https://open.fda.gov/apis/authentication/))

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd mcp-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
FDA_API_KEY=your_api_key_here
```

4. Build the project:
```bash
npm run build
```

## Development

The project uses TypeScript and follows a clean architecture pattern:

- `src/controllers/` - MCP server controller
- `src/services/` - Business logic and API integration
  - `fda.service.ts` - FDA API integration (currently Food Enforcement only)
- `src/schemas/` - Type definitions and validation schemas
  - `fda.schema.ts` - FDA API request/response schemas
- `src/mappers/` - Data transformation utilities
  - `fda.mapper.ts` - FDA API data mapping
- `src/utils/` - Helper functions and logging

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run integration tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

The project includes an integration test suite that verifies the MCP service functionality. Tests are located in `tests/integration/`.

To run the tests:
```bash
npm test
```

The test suite:
- Starts a local MCP server
- Connects a test client
- Runs test cases against the FDA Food Enforcement API
- Verifies response formats and error handling
- Cleans up resources after completion

## Usage

### As an MCP Service

To expose this service to Claude, add the following to your Claude configuration:

```json
{
  "mcpServers": {
    "fda-server": {
      "command": "node",
      "args": ["path/to/dist/index.js"],
      "env": {
        "FDA_API_KEY": "your_api_key_here",
        "LOG_PATH": "path/to/logs/app.log"
      }
    }
  }
}
```

Replace the paths with your actual paths:
- `path/to/dist/index.js` - Path to the built service
- `path/to/logs/app.log` - Path where you want logs to be written

### Search Parameters

The service supports the following search parameters for FDA Food Enforcement data:

- `product_type` - Type of product (e.g., "Food")
- `product_description` - Description of the product (supports wildcards)
- `recall_initiation_date_start` - Start date for recall range
- `recall_initiation_date_end` - End date for recall range
- `city` - City where the recall was initiated
- `state` - State where the recall was initiated
- `recalling_firm` - Name of the recalling firm
- `limit` - Number of results to return (default: 10)
- `skip` - Number of results to skip (for pagination)
- `sort_field` - Field to sort by
- `sort_direction` - Sort direction ("asc" or "desc")

Example search:
```typescript
{
  product_type: "Food",
  city: "Omaha",
  limit: 10
}
```

## Error Handling

The service provides structured error responses for:
- Invalid API keys
- Network failures
- Invalid search parameters
- FDA API errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Future Plans

- Add support for other FDA API endpoints
- Implement caching for frequently accessed data
- Add more comprehensive error handling
- Support for batch operations
- Additional search parameters and filters

## License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 