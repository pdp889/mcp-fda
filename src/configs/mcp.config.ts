export const mcpConfig = {
  name: 'FDA API',
  version: '1.0.0',
  description:
    'A service for querying the FDA API. Provides access to both Food Enforcement (recalls, market withdrawals, safety alerts) and Food Event (adverse event reports) databases. ' +
    'Supports searching by various fields, date ranges, and wildcard matching using *. ' +
    'Results include detailed information about each record and support pagination and sorting.',
  examples: [
    // Food Enforcement examples
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
      name: 'Search Food Enforcement by Status',
      params: {
        status: 'Ongoing',
        product_description: 'chocolate*',
        limit: 5,
      },
    },
    {
      name: 'Search Food Enforcement by Location',
      params: {
        city: 'Omaha',
        state: 'NE',
        limit: 5,
      },
    },
    // Food Event examples
    {
      name: 'Search Food Events by Date Range',
      params: {
        date_created_start: '2024-01-01',
        date_created_end: '2024-12-31',
        limit: 10,
      },
    },
    {
      name: 'Search Food Events by Outcome',
      params: {
        outcomes: ['Hospitalization'],
        limit: 5,
      },
    },
    {
      name: 'Search Food Events by Product',
      params: {
        'products.name_brand': 'chocolate*',
        limit: 5,
      },
    },
    {
      name: 'Search Food Events by Reaction',
      params: {
        reactions: ['nausea', 'vomiting'],
        limit: 5,
      },
    },
  ],
};
