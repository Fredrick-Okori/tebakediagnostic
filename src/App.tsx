import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  return (
    <ChakraProvider>
      <div className="app">
        <h2 className="center fs-30">Tebake Diagnostic Centre - Reporting</h2>
        <InvoicePage data={data} onChange={onInvoiceUpdated} />
      </div>
    </ChakraProvider>
    
  )
}

export default App


