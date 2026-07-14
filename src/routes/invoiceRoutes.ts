import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares/validate';
import { insertInvoiceSchema, invoiceIdParam } from '../domain/invoice.schema';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceController } from '../controllers/invoice.controller';

const router = Router();

const repository = new InvoiceRepository();
const service = new InvoiceService(repository);
const controller = new InvoiceController(service);

router.post(
  '/',
  validate(z.object({ body: insertInvoiceSchema })),
  controller.createInvoice,
);

router.get('/', controller.getAllInvoices);

router.get(
  '/:id',
  validate(z.object({ params: invoiceIdParam })),
  controller.getInvoiceById,
);

router.put(
  '/:id',
  validate(
    z.object({
      params: invoiceIdParam,
      body: insertInvoiceSchema.partial(),
    }),
  ),
  controller.updateInvoice,
);

router.delete(
  '/:id',
  validate(z.object({ params: invoiceIdParam })),
  controller.deleteInvoice,
);

export default router;
