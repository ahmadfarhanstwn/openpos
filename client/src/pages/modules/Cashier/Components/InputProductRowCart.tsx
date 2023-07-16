import { Autocomplete, TableCell, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useLazyGetProductSuggestionsQuery } from '../../../../redux/api/cashierApi'
import '../../../../styles/styles.css'
import FlexBetween from '../../../../components/FlexBetween'
import { useLazyGetProductByIdQuery } from '../../../../redux/api/productApi'

interface IProductSuggestionOptions {
    id: number,
    label: string
}

const InputProductRowCart = () => {

    const [productQuery, setProductQuery] = useState('')
    const [productSuggestions, setProductSuggestions] = useState<IProductSuggestionOptions[]>([])
    const [isProductNameSelected, setIsProductNameSelected] = useState<boolean>(false)

    const [productValue, setProductValue] = useState({
        name: '',
        stock: 0,
        qty: 0,
        price: 0,
        discount: 0,
        subtotal: 0,
        unitName: ''
    });

    // fetch API
    const [getProductSuggestions, productSuggestionsResponse] = useLazyGetProductSuggestionsQuery()

    useEffect(() => {
        getProductSuggestions({product_name: productQuery})
    }, [productQuery, getProductSuggestions])

    useEffect(() => {
        if(productSuggestionsResponse.isSuccess) {
            const newOptions : IProductSuggestionOptions[] = productSuggestionsResponse.data?.data.map((row) => ({
                id: row.product_id,
                label: row.product_name
            })) || []

            setProductSuggestions(newOptions)
        }
    }, 
    [productSuggestionsResponse])

    const [getProductById, productByIdResponse] = useLazyGetProductByIdQuery()

    const handleProductSuggestionChange = useCallback((event, value: any) => {
        setProductValue({
            ...productValue,
            name: value.label
        });
        setIsProductNameSelected(true)
        getProductById({product_id: value.id})

        const productQtyInput = document.getElementById('product-qty-input');
        if (productQtyInput) {
            productQtyInput.focus();
        }
    }, [setProductValue, setIsProductNameSelected, getProductById])

    useEffect(() => {
        if (productByIdResponse.isSuccess) {
            setProductValue({
                ...productValue,
                stock: productByIdResponse.data.data?.unit_in_stock,
                unitName: productByIdResponse.data.data?.unit_name || '',
                price: productByIdResponse.data.data?.product_price,
                subtotal: productByIdResponse.data.data?.product_price
            })
        }
    }, [productByIdResponse])

    const handleQtyInputSubmit = (e: any) => {
        if (e.key === 'Enter') {
            const productDiscountInput = document.getElementById('product-discount-input');
            if (productDiscountInput) {
                productDiscountInput.focus();
            }
        }
    }

    const handleChangeQty = (e: any) => {
        const newQty = Math.max(0, Math.min(productValue.stock, parseInt(e.target.value))); 
        const price = productValue.price
        const discount = productValue.discount
        const subtotal = price * newQty
        setProductValue({
            ...productValue,
            qty: newQty,
            subtotal: subtotal - (subtotal * (discount / 100))
        });
    }

    const handleChangeDiscount = (e: any) => {
        const newDiscount = Math.max(0, Math.min(100, Number(e.target.value)));
        const price = productValue.price
        const qty = productValue.qty
        const subtotal = price * qty
        setProductValue({
            ...productValue,
            discount: newDiscount,
            subtotal: subtotal - (subtotal * (newDiscount / 100))
        });
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key="filters">
            <TableCell key='id'></TableCell>
            <TableCell key='product_name'>
                {!isProductNameSelected && <Autocomplete
                    sx={{
                    display: 'inline-block',
                    '& input': {
                        width: 200,
                        bgcolor: 'background.paper',
                        color: (theme) =>
                        theme.palette.getContrastText(theme.palette.background.paper),
                    },
                    }}
                    inputValue={productQuery}
                    onInputChange={(event, value) => setProductQuery(value)}
                    onChange={handleProductSuggestionChange}
                    options={productSuggestions}
                    renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input 
                            placeholder='Product Name' 
                            style={{padding: '1rem', height: '2rem', fontSize: '16px'}} 
                            type="text" 
                            {...params.inputProps} 
                        />
                    </div>
                    )}
                />}
                {isProductNameSelected && <Typography>{productValue.name}</Typography>}
            </TableCell>
            <TableCell key='product_stock' align='center'>
                {productValue.stock}
            </TableCell>
            <TableCell key='product_unit'>
                {productValue.unitName}
            </TableCell>
            <TableCell key='product_quantity' align='center'>
                <input 
                    id='product-qty-input' 
                    value={productValue.qty}
                    onChange={handleChangeQty}
                    style={{ padding: '.5rem', height: '2rem', width: '3rem', fontSize: '16px', alignContent:'center'}}
                    type='number'
                    onKeyDown={handleQtyInputSubmit}
                    className='hideNumberInputArrows'
                />
            </TableCell>
            <TableCell key='product_price' align='center'>
                {productValue.price}
            </TableCell>
            <TableCell key='product_discount' align='center'>
                <FlexBetween>
                    <Typography>%</Typography>
                    <input
                        id='product-discount-input'
                        value={productValue.discount}
                        onChange={handleChangeDiscount}
                        style={{ padding: '.5rem', height: '2rem', width: '3rem', fontSize: '16px', alignContent:'center'}}
                        type='number'
                        className='hideNumberInputArrows'
                    />
                </FlexBetween>
            </TableCell>
            <TableCell key='product_subtotal' align='center'>
                {productValue.subtotal}
            </TableCell>
            <TableCell key='product_actions'></TableCell>
        </TableRow>
    )
}

export default InputProductRowCart