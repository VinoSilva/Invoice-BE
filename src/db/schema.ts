import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  jsonb,
  numeric,
  //   timestamp,
} from 'drizzle-orm/pg-core';

// export const usersTable = pgTable('users', {
//   // serial() creates an auto-incrementing integer
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

// Define the type for the items array to keep our JSONB column strictly typed
export type InvoiceItem = {
  item: string;
  quantity: number;
  rate: number;
};

export const invoicesTable = pgTable('invoices', {
  id: serial('id').primaryKey(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  from: text('from').notNull(),
  billTo: text('bill_to').notNull(),
  shipTo: text('ship_to'),
  date: date('date').notNull(),
  paymentTerms: text('payment_terms'),
  dueDate: date('due_date'),
  poNumber: varchar('po_number', { length: 100 }),

  // Store the nested array directly as JSONB
  items: jsonb('items').$type<InvoiceItem[]>().notNull().default([]),

  notes: text('notes'),
  // Precision 12, scale 2 means: up to 10 digits before the decimal, 2 after
  taxAmount: numeric('tax_amount', { precision: 12, scale: 2 }),
  taxPercent: numeric('tax_percent', { precision: 5, scale: 2 }),
  terms: text('terms').notNull(),
  discountAmount: numeric('discount_amount', { precision: 12, scale: 2 }),
  discountPercent: numeric('discount_percent', { precision: 5, scale: 2 }),
  shipping: numeric('shipping', { precision: 12, scale: 2 })
    .notNull()
    .default('0'),
  amountPaid: numeric('amount_paid', { precision: 12, scale: 2 }),
});
