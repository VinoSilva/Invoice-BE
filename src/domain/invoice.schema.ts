import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { invoicesTable } from '../db/schema';
import { z } from 'zod';

extendZodWithOpenApi(z);

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

export type CreateInvoiceDTO = z.infer<typeof insertInvoiceSchema>;
export type InvoiceDTO = z.infer<typeof selectInvoiceSchema>;
