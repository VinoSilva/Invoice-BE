import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  createInvoice = async (req: Request, res: Response) => {
    try {
      const invoice = await this.invoiceService.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllInvoices = async (req: Request, res: Response) => {
    try {
      const invoices = await this.invoiceService.getAllInvoices();
      res.json(invoices);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  };

  getInvoiceById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const invoice = await this.invoiceService.getInvoiceById(id);
      res.json(invoice);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  updateInvoice = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const invoice = await this.invoiceService.updateInvoice(id, req.body);
      res.json(invoice);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  deleteInvoice = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const invoice = await this.invoiceService.deleteInvoice(id);
      res.json({ message: 'Invoice deleted successfully', id: invoice.id });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
