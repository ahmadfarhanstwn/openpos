import { TableCell, TableRow } from '@mui/material'
import SearchTextInput from '../../../../components/SearchTextInput'
import SearchSelectInput from '../../../../components/SearchSelectInput'
import React from 'react'

interface ISearchProductFilterProps {
    productBarcodeFilter: string,
    handleChangeProductBarcodeFilter: (value: string) => void,
    productNameFilter: string,
    handleChangeProductNameFilter: (value: string) => void,
    productUnitFilter: string,
    handleChangeProductUnitFilter: (value: string) => void,
    productCategoryFilter: string,
    handleChangeProductCategoryFilter: (value: string) => void,
    unitValues: never[],
    categoryValues: never[]
}

const SearchProductFilter: React.FC<ISearchProductFilterProps> = (
    {
        productBarcodeFilter,
        handleChangeProductBarcodeFilter,
        productNameFilter,
        handleChangeProductNameFilter,
        productUnitFilter,
        handleChangeProductUnitFilter,
        productCategoryFilter,
        handleChangeProductCategoryFilter,
        unitValues,
        categoryValues
    }
) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key="filters">
        <TableCell key='product_id'></TableCell>
        <TableCell key='product_barcode'>
            <SearchTextInput label='Search Barcode' value={productBarcodeFilter} handleChange={handleChangeProductBarcodeFilter} />
        </TableCell>
        <TableCell key='product_name'>
            <SearchTextInput label='Search Name' value={productNameFilter} handleChange={handleChangeProductNameFilter} />
        </TableCell>
        <TableCell key='product_unit'>
            <SearchSelectInput label='Search Product Unit' value={productUnitFilter} handleChange={handleChangeProductUnitFilter} itemValues={unitValues} />
        </TableCell>
        <TableCell key='product_stock'></TableCell>
        <TableCell key='product_price'></TableCell>
        <TableCell key='product_discount'></TableCell>
        <TableCell key='product_category'>
            <SearchSelectInput label='Search Product Category' value={productCategoryFilter} handleChange={handleChangeProductCategoryFilter} itemValues={categoryValues} />
        </TableCell>
        <TableCell key='product_actions'></TableCell>
    </TableRow>
  )
}

export default SearchProductFilter