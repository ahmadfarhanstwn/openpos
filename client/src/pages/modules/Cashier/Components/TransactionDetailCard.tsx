import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBetween from '../../../../components/FlexBetween'
import CancelTransactionButton from './CancelTransactionButton'
import DraftTransactionButton from './DraftTransactionButton'
import { useAppSelector } from '../../../../redux/store'
import '../../../../styles/styles.css'
import PaymentTypeOptions from './PaymentTypeOptions'

const TransactionDetailCard = () => {
    const theme = useTheme()

    const transactionTotalSubtotal = useAppSelector((state) => state.transactionState.transactionTotalSubtotal)

    const [discount, setDiscount] = useState<number>(0)
    const [additionalCosts, setAdditionalCosts] = useState<number>(0)
    const [deliveryCost, setDeliveryCost] = useState<number>(0)
    const [grandTotal, setGrandTotal] = useState<number>(transactionTotalSubtotal)

    // discount
    const handleChangeDiscount = (e: any) => {
        const newDiscount = Math.max(0, Math.min(transactionTotalSubtotal, Number(e.target.value)));
        setDiscount(newDiscount)
    }

    const handleDiscountInputSubmit = (e: any) => {
        if (e.key === 'Enter') {
            const productDiscountInput = document.getElementById('transaction-additional-costs-input');
            if (productDiscountInput) {
                productDiscountInput.focus();
            }
        }
    }

    // additional costs
    const handleChangeAdditionalCosts = (e: any) => {
        setAdditionalCosts(Number(e.target.value))
    }

    const handleAdditionalCostsInputSubmit = (e: any) => {
        if (e.key === 'Enter') {
            const productDiscountInput = document.getElementById('transaction-delivery-cost-input');
            if (productDiscountInput) {
                productDiscountInput.focus();
            }
        }
    }

    // delivery cost
    const handleChangeDeliveryCost = (e: any) => {
        setDeliveryCost(Number(e.target.value))
    }

    // grandtotal
    useEffect(() => {
        const newGrandTotal = transactionTotalSubtotal - discount + additionalCosts + deliveryCost
        setGrandTotal(newGrandTotal)
    }, [transactionTotalSubtotal, discount, additionalCosts, deliveryCost])

    return (
        <Card sx={{
            backgroundImage: "none", 
            backgroundColor: theme.palette.background.default, 
            borderRadius: "0.55rem",
            width: '25%'
        }}>
            <CardContent>
                <Box flexGrow={1} display="flex" justifyContent='space-between' flexDirection="column" sx={{marginBottom: '1rem'}}>
                    <Box sx={{display: 'flex', alignItems: 'center',justifyContent: 'flex-end'}}>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '30px'}}>Rp. {grandTotal}</Typography>
                    </Box>
                    <FlexBetween sx={{marginTop: '.5rem', marginBottom: '.5rem'}}>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Discount</Typography>
                        <input 
                            id='transaction-discount-input' 
                            value={discount}
                            onChange={handleChangeDiscount}
                            style={{ padding: '.5rem', height: '2rem', width: '60%', fontSize: '16px', alignContent:'center'}}
                            type='number'
                            onKeyDown={handleDiscountInputSubmit}
                            className='hideNumberInputArrows'
                        />
                    </FlexBetween>
                    <FlexBetween sx={{marginTop: '.5rem', marginBottom: '.5rem'}}>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Additional Costs</Typography>
                        <input 
                            id='transaction-additional-costs-input' 
                            value={additionalCosts}
                            onChange={handleChangeAdditionalCosts}
                            style={{ padding: '.5rem', height: '2rem', width: '60%', fontSize: '16px', alignContent:'center'}}
                            type='number'
                            onKeyDown={handleAdditionalCostsInputSubmit}
                            className='hideNumberInputArrows'
                        />
                    </FlexBetween>
                    <FlexBetween sx={{marginTop: '.5rem', marginBottom: '.5rem'}}>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Delivery Cost</Typography>
                        <input 
                            id='transaction-delivery-cost-input' 
                            value={deliveryCost}
                            onChange={handleChangeDeliveryCost}
                            style={{ padding: '.5rem', height: '2rem', width: '60%', fontSize: '16px', alignContent:'center'}}
                            type='number'
                            className='hideNumberInputArrows'
                        />
                    </FlexBetween>
                    <PaymentTypeOptions />
                    <FlexBetween sx={{marginTop: '2rem'}}>
                        <CancelTransactionButton />
                        <DraftTransactionButton />
                    </FlexBetween>
                </Box>
            </CardContent>
        </Card>
    )
}

export default TransactionDetailCard