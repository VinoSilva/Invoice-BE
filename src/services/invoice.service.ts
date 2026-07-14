import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceDTO } from '../domain/invoice.schema';

export class InvoiceService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async createInvoice(data: CreateInvoiceDTO) {
    return await this.invoiceRepository.create(data);
  }

  async getAllInvoices() {
    return await this.invoiceRepository.findAll();
  }

  async getInvoiceById(id: number) {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  async updateInvoice(id: number, data: Partial<CreateInvoiceDTO>) {
    const invoice = await this.invoiceRepository.update(id, data);
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  async deleteInvoice(id: number) {
    const invoice = await this.invoiceRepository.delete(id);
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }
}
