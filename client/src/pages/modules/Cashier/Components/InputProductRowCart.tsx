import { Autocomplete, InputAdornment, MenuItem, OutlinedInput, Select, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLazyGetProductSuggestionsQuery } from '../../../../redux/api/cashierApi'

interface IProductSuggestionOptions {
    id: number,
    label: string
}

const InputProductRowCart = () => {
    const [productQuery, setProductQuery] = useState('')
    const [productSuggestions, setProductSuggestions] = useState<IProductSuggestionOptions[]>([])

    // fetch API
    const [getProductSuggestions, productSuggestionsResponse] = useLazyGetProductSuggestionsQuery()

    useEffect(() => {
        getProductSuggestions({product_name: productQuery})
    }, [productQuery, getProductSuggestions])

    useEffect(() => {
        console.log(productSuggestionsResponse)
        if(productSuggestionsResponse.isSuccess) {
            const newOptions : IProductSuggestionOptions[] = productSuggestionsResponse.data?.data.map((row) => ({
                id: row.product_id,
                label: row.product_name
            })) || []

            setProductSuggestions(newOptions)
        }
    }, 
    [productSuggestionsResponse])

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key="filters">
            <TableCell key='id'></TableCell>
            <TableCell key='product_name'>
                <Autocomplete
                    inputValue={productQuery}
                    onInputChange={(event, value) => setProductQuery(value)}
                    options={productSuggestions}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <OutlinedInput value={productQuery} size='small' {...params.inputProps} sx={{fontSize: '14px'}} placeholder='Product Name' />
                        </div>
                    )}
                />
                
            </TableCell>
            <TableCell key='product_stock'>
                {0}
            </TableCell>
            <TableCell key='product_unit'>
            <Select
                value=""
                displayEmpty
                size='small'
                sx={{fontSize: '14px'}}
            >
                <MenuItem value="">
                    <em></em>
                </MenuItem>
            </Select>
            </TableCell>
            <TableCell key='product_quantity'>
                <OutlinedInput value={0} sx={{fontSize: '14px'}} size='small' placeholder='Quantity' />
            </TableCell>
            <TableCell key='product_price'>
                <OutlinedInput value={0} sx={{fontSize: '14px'}} size='small' placeholder='Price' />
            </TableCell>
            <TableCell key='product_discount'>
                <OutlinedInput value={0} startAdornment={<InputAdornment sx={{fontSize: '14px'}} position="start">%</InputAdornment>} sx={{fontSize: '14px'}} size='small' placeholder='Discount' />
            </TableCell>
            <TableCell key='product_subtotal'>
                {0}
            </TableCell>
            <TableCell key='product_actions'></TableCell>
        </TableRow>
    )
}

export default InputProductRowCart