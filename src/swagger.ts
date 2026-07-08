import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import {
  insertInvoiceSchema,
  invoiceIdParam,
  selectInvoiceSchema,
} from './schema/invoice.zod';
import { z } from 'zod';

export const registry = new OpenAPIRegistry();

// Define a reusable Bearer auth security scheme (if you need it later)
const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// Register the Get Single Invoice Route (GET /api/invoices/{id})
registry.registerPath({
  method: 'get',
  path: '/api/invoices/{id}',
  summary: 'Get an invoice by ID',
  tags: ['Invoices'],
  request: {
    params: invoiceIdParam,
  },
  responses: {
    200: {
      description: 'The requested invoice',
      content: {
        'application/json': {
          schema: selectInvoiceSchema,
        },
      },
    },
    404: {
      description: 'Invoice not found',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// Register the Update Invoice Route (PUT /api/invoices/{id})
registry.registerPath({
  method: 'put',
  path: '/api/invoices/{id}',
  summary: 'Update an existing invoice',
  tags: ['Invoices'],
  request: {
    params: invoiceIdParam,
    body: {
      content: {
        'application/json': {
          // Using .partial() because an update might only contain specific fields
          schema: insertInvoiceSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Invoice updated successfully',
      content: {
        'application/json': {
          schema: selectInvoiceSchema,
        },
      },
    },
    404: {
      description: 'Invoice not found',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// Register the Delete Invoice Route (DELETE /api/invoices/{id})
registry.registerPath({
  method: 'delete',
  path: '/api/invoices/{id}',
  summary: 'Delete an invoice',
  tags: ['Invoices'],
  request: {
    params: invoiceIdParam,
  },
  responses: {
    200: {
      description: 'Invoice deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            id: z.number(),
          }),
        },
      },
    },
    404: {
      description: 'Invoice not found',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// Register the Create Invoice Route
registry.registerPath({
  method: 'post',
  path: '/api/invoices',
  summary: 'Create a new invoice',
  tags: ['Invoices'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertInvoiceSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Invoice created successfully',
      content: {
        'application/json': {
          schema: selectInvoiceSchema,
        },
      },
    },
  },
});

// Register the Get Invoices Route
registry.registerPath({
  method: 'get',
  path: '/api/invoices',
  summary: 'Get all invoices',
  tags: ['Invoices'],
  responses: {
    200: {
      description: 'List of invoices',
      content: {
        'application/json': {
          schema: z.array(selectInvoiceSchema),
        },
      },
    },
  },
});

// Function to generate the final OpenAPI JSON
export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0', // Strictly declaring the standard version
    info: {
      version: '1.0.0',
      title: 'Invoice API',
      description: 'API documentation for the Invoice backend',
    },
    servers: [{ url: 'http://localhost:3000' }],
  });
}
