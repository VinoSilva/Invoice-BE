// Import libraries
import { z } from 'zod';
import { Router } from 'express';

// Import middlewares
import { validate } from '../middlewares/validate';

// Import controllers
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.controller';

// Import schemas
import { insertInvoiceSchema, invoiceIdParam } from '../schema/invoice.zod';

const router = Router();

router.post(
  '/',
  validate(z.object({ body: insertInvoiceSchema })),
  createInvoice,
);
router.get('/', getInvoices);
router.get(
  '/:id',
  validate(z.object({ params: invoiceIdParam })),
  getInvoiceById,
);
router.put(
  '/:id',
  validate(
    z.object({
      params: invoiceIdParam,
      body: insertInvoiceSchema.partial(),
    }),
  ),
  updateInvoice,
);
router.delete(
  '/:id',
  validate(z.object({ params: invoiceIdParam })),
  deleteInvoice,
);

export default router;
