import { Box, Typography } from '@mui/material'
import React from 'react'
import PaymentTypeValues, { IPaymentTypeValue } from '../Const/PaymentTypeLists'
import PaymentCardOption from './PaymentCardOption'

const PaymentTypeOptions = () => {
  return (
    <Box sx={{marginTop: '.5rem', marginBottom: '.5rem'}}>
        <Typography sx={{fontWeight: 'bold', fontSize: '16px'}}>Choose Payment Type</Typography>
        {PaymentTypeValues.map((paymentTypeValue: IPaymentTypeValue) => (
            <PaymentCardOption 
                title={paymentTypeValue.text}
                id={paymentTypeValue.id}
                handleClick={() => {}}
                icon={paymentTypeValue.icon}
                selectedId='cash'
            />
        ))}
    </Box>
  )
}

export default PaymentTypeOptions