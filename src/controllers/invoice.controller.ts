// src/controllers/invoice.controller.ts
import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { invoicesTable } from '../db/schema';

// CREATE
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const [newInvoice] = await db
      .insert(invoicesTable)
      .values(req.body)
      .returning(); // Returns the created record

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

// READ (All)
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await db.select().from(invoicesTable);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

// READ (Single)
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [invoice] = await db
      .select()
      .from(invoicesTable)
      .where(eq(invoicesTable.id, id));

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
};

// UPDATE
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [updatedInvoice] = await db
      .update(invoicesTable)
      .set(req.body)
      .where(eq(invoicesTable.id, id))
      .returning();

    if (!updatedInvoice)
      return res.status(404).json({ error: 'Invoice not found' });

    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice' });
  }
};

// DELETE
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [deletedInvoice] = await db
      .delete(invoicesTable)
      .where(eq(invoicesTable.id, id))
      .returning();

    if (!deletedInvoice)
      return res.status(404).json({ error: 'Invoice not found' });

    res.json({
      message: 'Invoice deleted successfully',
      id: deletedInvoice.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
};
