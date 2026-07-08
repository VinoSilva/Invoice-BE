import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { invoicesTable } from '../db/schema';

// This is required once to allow Zod schemas to hold OpenAPI metadata
extendZodWithOpenApi(z);

// Automatically generate Zod schemas from your Drizzle table
export const insertInvoiceSchema = createInsertSchema(invoicesTable).openapi({
  title: 'Create Invoice Payload',
});

export const selectInvoiceSchema = createSelectSchema(invoicesTable).openapi({
  title: 'Invoice',
});

export const invoiceIdParam = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be a valid numeric string')
    .openapi({
      param: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The unique integer ID of the invoice',
      },
      example: '1',
    }),
});
