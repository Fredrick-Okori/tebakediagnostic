import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  description: '',
  quantity: '1',
  rate: '0.00',
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  title: 'Lab Report',
  companyName: 'Tebake Diagnostic Centre',
  name: '',
  companyAddress: '',
  companyAddress2: '',
  companyCountry: 'Uganda',
  billTo: 'Specimen:',
  clientName: '',
  clientAddress: '',
  clientAddress2: '',
  clientCountry: 'Uganda',
  invoiceTitleLabel: 'Lab#',
  invoiceTitle: '',
  invoiceDateLabel: 'Report Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',
  productLineDescription: 'Test',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    {
      description: 'Pink ballons',
      quantity: '2',
      rate: '100.00',
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax (10%)',
  totalLabel: 'TOTAL',
  currency: '$',
  notesLabel: 'Notes',
  notes: 'Account Details: 0775281189 | Account Name: Niwakora Africano Eric',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',
}
