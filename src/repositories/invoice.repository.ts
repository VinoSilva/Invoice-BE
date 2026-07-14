import { eq } from 'drizzle-orm';
import { db } from '../db';
import { invoicesTable } from '../db/schema';
import { CreateInvoiceDTO } from '../domain/invoice.schema';

export class InvoiceRepository {
  async create(data: CreateInvoiceDTO) {
    const [invoice] = await db.insert(invoicesTable).values(data).returning();
    return invoice;
  }

  async findAll() {
    return await db.select().from(invoicesTable);
  }

  async findById(id: number) {
    const [invoice] = await db
      .select()
      .from(invoicesTable)
      .where(eq(invoicesTable.id, id));
    return invoice;
  }

  async update(id: number, data: Partial<CreateInvoiceDTO>) {
    const [invoice] = await db
      .update(invoicesTable)
      .set(data)
      .where(eq(invoicesTable.id, id))
      .returning();
    return invoice;
  }

  async delete(id: number) {
    const [invoice] = await db
      .delete(invoicesTable)
      .where(eq(invoicesTable.id, id))
      .returning();
    return invoice;
  }
}
