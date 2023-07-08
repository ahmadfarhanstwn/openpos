import { TableCell, TableRow } from '@mui/material'
import SearchTextInput from '../../../../components/SearchTextInput'
import SearchSelectInput from '../../../../components/SearchSelectInput'

const SearchProductFilter = () => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key="filters">
        <TableCell key='product_id'></TableCell>
        <TableCell key='product_barcode'>
            <SearchTextInput label='Search Barcode' value='' handleChange={() => {}} />
        </TableCell>
        <TableCell key='product_name'>
            <SearchTextInput label='Search Name' value='' handleChange={() => {}} />
        </TableCell>
        <TableCell key='product_unit'>
            <SearchSelectInput label='Search Product Unit' value='' handleChange={() => {}} itemValues={[]} />
        </TableCell>
        <TableCell key='product_stock'></TableCell>
        <TableCell key='product_price'></TableCell>
        <TableCell key='product_discount'></TableCell>
        <TableCell key='product_category'>
            <SearchSelectInput label='Search Product Category' value='' handleChange={() => {}} itemValues={[]} />
        </TableCell>
        <TableCell key='product_actions'></TableCell>
    </TableRow>
  )
}

export default SearchProductFilter