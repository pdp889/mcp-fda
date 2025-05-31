# FDA API MCP Service

A Model Context Protocol (MCP) service that provides access to the FDA API, supporting both Food Enforcement and Food Event databases.

## Features

### Food Enforcement API
- Search food recalls, market withdrawals, and safety alerts
- Filter by product type, description, and status
- Search by date ranges (recall initiation, report date, etc.)
- Location-based filtering (city, state, country)
- Wildcard matching in search terms

### Food Event API
- Search adverse event reports
- Filter by consumer information (age, gender)
- Search by date ranges (created, started)
- Filter by outcomes (e.g., hospitalization)
- Product-based filtering (brand name, industry code)
- Reaction-based filtering
- Wildcard matching in search terms

### Common Features
- Pagination support
- Sorting capabilities
- Comprehensive error handling
- Integration test suite
- Logging and monitoring

## Prerequisites

- Node.js (v18 or higher)
- npm
- FDA API Key (get one from [FDA API Portal](https://open.fda.gov/apis/authentication/))

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd mcp-fda
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
  - `fda.service.ts` - Base FDA API integration
  - `food-enforcement.service.ts` - Food Enforcement API integration
  - `food-event.service.ts` - Food Event API integration
- `src/schemas/` - Type definitions and validation schemas
  - `food-enforcement.schema.ts` - Food Enforcement API schemas
  - `food-event.schema.ts` - Food Event API schemas
- `src/tools/` - MCP tool implementations
  - `fda.tool.ts` - Base FDA tool implementation
  - `food-enforcement.tool.ts` - Food Enforcement tool
  - `food-event.tool.ts` - Food Event tool
- `src/mappers/` - Data transformation utilities
- `src/utils/` - Helper functions and logging

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run integration tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

The project includes an integration test suite that verifies both Food Enforcement and Food Event API functionality. Tests are located in `tests/integration/`.

To run the tests:
```bash
npm test
```

The test suite:
- Starts a local MCP server
- Connects a test client
- Runs test cases against both FDA APIs
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

### Search Parameters

#### Food Enforcement Search Parameters
- `product_type` - Type of product (e.g., "Food")
- `product_description` - Description of the product (supports wildcards)
- `recall_initiation_date_start` - Start date for recall range
- `recall_initiation_date_end` - End date for recall range
- `city` - City where the recall was initiated
- `state` - State where the recall was initiated
- `recalling_firm` - Name of the recalling firm
- `status` - Recall status (e.g., "Ongoing")
- `limit` - Number of results to return (default: 10)
- `skip` - Number of results to skip (for pagination)
- `sort_field` - Field to sort by
- `sort_direction` - Sort direction ("asc" or "desc")

Example Food Enforcement search:
```typescript
{
  product_type: "Food",
  city: "Omaha",
  status: "Ongoing",
  limit: 10
}
```

#### Food Event Search Parameters
- `date_created_start` - Start date for report creation range
- `date_created_end` - End date for report creation range
- `date_started_start` - Start date for event start range
- `date_started_end` - End date for event start range
- `outcomes` - Array of outcomes (e.g., ["HOSPITALIZATION"])
- `products.name_brand` - Product brand name (supports wildcards)
- `products.industry_code` - FDA industry code
- `reactions` - Array of reactions (e.g., ["nausea", "vomiting"])
- `limit` - Number of results to return (default: 10)
- `skip` - Number of results to skip (for pagination)
- `sort_field` - Field to sort by
- `sort_direction` - Sort direction ("asc" or "desc")

Example Food Event search:
```typescript
{
  date_created_start: "2024-01-01",
  date_created_end: "2024-12-31",
  outcomes: ["HOSPITALIZATION"],
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
- Rate limiting and throttling
- Enhanced logging and monitoring

## License

MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
