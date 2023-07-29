import { Box, Card, CardContent, OutlinedInput, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../../components/FlexBetween'
import CancelTransactionButton from './CancelTransactionButton'
import DraftTransactionButton from './DraftTransactionButton'
import { useAppSelector } from '../../../../redux/store'

const PaymentCard = () => {
    const theme = useTheme()

    const transactionTotalSubtotal = useAppSelector((state) => state.transactionState.transactionTotalSubtotal)

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
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '30px'}}>Rp. {transactionTotalSubtotal}</Typography>
                    </Box>
                    <FlexBetween>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Discount</Typography>
                        <OutlinedInput size='small' sx={{width: '60%'}} />
                    </FlexBetween>
                    <FlexBetween>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Additional Costs</Typography>
                        <OutlinedInput size='small' sx={{width: '60%'}} />
                    </FlexBetween>
                    <FlexBetween>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Delivery Cost</Typography>
                        <OutlinedInput size='small' sx={{width: '60%'}} />
                    </FlexBetween>
                    <FlexBetween sx={{marginTop: '2rem'}}>
                        <CancelTransactionButton />
                        <DraftTransactionButton />
                    </FlexBetween>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PaymentCard