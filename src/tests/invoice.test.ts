import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import invoiceRoutes from '../routes/invoiceRoutes';
import { db } from '../db';
import { invoicesTable } from '../db/schema';
import { eq } from 'drizzle-orm';

// 1. Setup an in-memory Express instance for Supertest
const app = express();
app.use(express.json());
app.use('/api/invoices', invoiceRoutes);

describe('Invoice API Integration Tests', () => {
  let testInvoiceId: number;

  // 2. Seed the database before tests run
  beforeAll(async () => {
    const [invoice] = await db
      .insert(invoicesTable)
      .values({
        invoiceNumber: `TEST-${Date.now()}`,
        from: 'Test Corp',
        billTo: 'Client LLC',
        date: '2026-07-08',
        terms: 'Net 30',
        shipping: '0',
      })
      .returning();

    testInvoiceId = invoice.id;
  });

  // 3. Clean up the database after tests
  afterAll(async () => {
    await db.delete(invoicesTable).where(eq(invoicesTable.id, testInvoiceId));
  });

  // 4. Write the failing test FIRST
  it('should return 400 if the ID is not a number', async () => {
    // We expect our Zod middleware to catch this
    const response = await request(app).get('/api/invoices/abc');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  it('should fetch an invoice by ID', async () => {
    console.log('Test Invoice ID:' + testInvoiceId);

    const response = await request(app).get(`/api/invoices/${testInvoiceId}`);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.from).toBe('Test Corp');
    expect(response.body.id).toBe(testInvoiceId);
  });
});
