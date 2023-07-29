import { Box, Button, Card, CardContent, OutlinedInput, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../../components/FlexBetween'
import CancelTransactionButton from './CancelTransactionButton'

const PaymentCard = () => {
    const theme = useTheme()
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
                    <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '30px'}}>Rp. 20.000</Typography>
                </Box>
                <FlexBetween>
                    <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Discount</Typography>
                    <OutlinedInput size='small' sx={{width: '60%'}} />
                </FlexBetween>
                <FlexBetween>
                    <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Costs</Typography>
                    <OutlinedInput size='small' sx={{width: '60%'}} />
                </FlexBetween>
                <FlexBetween>
                    <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '12px', marginRight: '1em'}}>Delivery Cost</Typography>
                    <OutlinedInput size='small' sx={{width: '60%'}} />
                </FlexBetween>
                <FlexBetween sx={{marginTop: '2rem'}}>
                    <CancelTransactionButton />
                    <Button sx={{marginRight: '1rem', height: '70%', fontSize: '16px', width: '50%'}} variant='outlined'>
                        DRAFT
                    </Button>
                </FlexBetween>
            </Box>
        </CardContent>
    </Card>
  )
}

export default PaymentCard