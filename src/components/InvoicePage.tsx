import { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import EditableFileImage from './EditableFileImage'
import countryList from '../data/countryList'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { Font } from '@react-pdf/renderer'
import Download from './DownloadPDF'
import { format } from 'date-fns/format'




// import { Value } from 'sass'

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf',
      fontWeight: 600,
    },
  ],
})

interface Props {
  data?: Invoice
  pdfMode?: boolean
  onChange?: (invoice: Invoice) => void
}

const InvoicePage: FC<Props> = ({ data, pdfMode, onChange }) => {
  const [invoice, setInvoice] = useState<Invoice>(data ? { ...data } : { ...initialInvoice })
 


  const dateFormat = 'MMM dd, yyyy'
  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date()
  const invoiceDueDate =
    invoice.invoiceDueDate !== ''
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf())

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30)
  }

  const handleChange = (name: keyof Invoice, value: string | number) => {
    const newInvoice = { ...invoice, [name]: value };
    setInvoice(newInvoice);
  };


  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
     
        const newProductLine = { ...productLine };
        (newProductLine as ProductLine)[name] = value; // This should now work correctly
        return newProductLine;
      }
      return productLine;
    });

    setInvoice({ ...invoice, productLines });
  };


  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((_, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }


 

 

  useEffect(() => {
    if (onChange) {
      onChange(invoice)
    }
  }, [onChange, invoice])

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} setData={(d) => setInvoice(d)} />}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>

            <EditableInput
              className="fs-19 bold"
              placeholder="Tebake Diagnostic Centre"
              value={invoice.companyName}
              onChange={(value) => handleChange('companyName', value)}
              pdfMode={pdfMode}
            />


            <EditableInput
              placeholder="Company's Address"
              value={invoice.companyAddress}
              onChange={(value) => handleChange('companyAddress', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.companyAddress2}
              onChange={(value) => handleChange('companyAddress2', value)}
              pdfMode={pdfMode}
            />
            <EditableSelect
              options={countryList}
              value={invoice.companyCountry}
              onChange={(value) => handleChange('companyCountry', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View>
            <EditableFileImage
              className="logo"
              placeholder="Your Logo"
              value={invoice.logo}
              width={invoice.logoWidth}
              pdfMode={pdfMode}
              onChangeImage={(value) => handleChange('logo', value)}
              onChangeWidth={(value) => handleChange('logoWidth', value)}
            />
          </View>
          <View className='w-50' pdfMode={pdfMode}>

            <EditableFileImage
              className="logo"
              value={invoice.arabic}
              width={invoice.arabicwidth}
              pdfMode={pdfMode}
              onChangeImage={(value) => handleChange('arabic', value)}
              onChangeWidth={(value) => handleChange('arabicwidth', value)}
            />
          </View>
        </View>

        <View className="w-100 bg-dark center" pdfMode={pdfMode}>


          <EditableInput
            className="fs-15 white center bold"

            placeholder='LABORATORY DEPARTMENT'
            value={invoice.banner}
            onChange={(value) => handleChange('banner', value)}
            pdfMode={pdfMode}
          />
        </View>

        <View className="flex mt-25" pdfMode={pdfMode}>
          <View className="w-55" pdfMode={pdfMode}>
            <EditableInput
              className="bold dark mb-5"
              placeholder='Type of test'
              value={invoice.billTo}
              onChange={(value) => handleChange('billTo', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              className='bold'
              placeholder="Patient"
              value={invoice.clientName}
              onChange={(value) => handleChange('clientName', value)}
              pdfMode={pdfMode}
            />
     
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceTitleLabel}
                  onChange={(value) => handleChange('invoiceTitleLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  placeholder="INV-12"
                  value={invoice.invoiceTitle}
                  onChange={(value) => handleChange('invoiceTitle', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDateLabel}
                  onChange={(value) => handleChange('invoiceDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : '',
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            
          </View>
        </View>

        <View className="mt-10 bg-dark flex" pdfMode={pdfMode}>
          <View className="w-40 p-4-6" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineDescription}
              onChange={(value) => handleChange('productLineDescription', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-40 p-2-6" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantity}
              onChange={(value) => handleChange('productLineQuantity', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-40 p-2-6" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantityRate}
              onChange={(value) => handleChange('productLineQuantityRate', value)}
              pdfMode={pdfMode}
            />
          </View>
          
        </View>

        {invoice.productLines.map((productLine, i) => {
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-40 p-2-6 pb-5" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark"

                  placeholder="Enter test parameter"
                  value={productLine.description}
                  onChange={(value) => handleProductLineChange(i, 'description', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-40 p-2-6 pb-5" pdfMode={pdfMode}>
               
                <EditableTextarea
                  className="w-100"
                  placeholder='Enter result'
                  value={productLine.result}
                  onChange={(value) => handleProductLineChange(i, 'result', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-35 p-2-6 pb-5" pdfMode={pdfMode}>
                <EditableTextarea
                  className="w-100"
                  value={productLine.unit}

                  onChange={(value) => handleProductLineChange(i, 'unit', value)}
                  pdfMode={pdfMode}
                />
              </View>

              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}
                >
                  <span className="icon icon-remove bg-red"></span>
                </button>
              )}
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
            {!pdfMode && (
              <button className="link" onClick={handleAdd}>
                <span className="icon icon-add bg-green mr-10"></span>
                Add a test parameter
              </button>
            )}
          </View>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
           
          </View>
        </View>

        <View className="mt-10" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100"
            value={invoice.notesLabel}
            onChange={(value) => handleChange('notesLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.notes}
            onChange={(value) => handleChange('notes', value)}
            pdfMode={pdfMode}
          />
        </View>
        <View className="mt-10" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100 center"
            value={invoice.termLabel}
            onChange={(value) => handleChange('termLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100 center"
            rows={2}
            value={invoice.term}
            onChange={(value) => handleChange('term', value)}
            pdfMode={pdfMode}
          />
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePage
