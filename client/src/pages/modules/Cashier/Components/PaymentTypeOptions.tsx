import { Box, Typography } from '@mui/material'
import React from 'react'
import PaymentTypeValues, { IPaymentTypeValue } from '../Const/PaymentTypeLists'
import PaymentCardOption from './PaymentCardOption'

interface IPaymentTypeOptionsProps {
    selectedPaymentType : string,
    handleClick: (paymentTypeId : string) => void
}

const PaymentTypeOptions: React.FC<IPaymentTypeOptionsProps> = ({
    selectedPaymentType,
    handleClick
}) => {
  return (
    <Box sx={{marginTop: '.5rem', marginBottom: '.5rem'}}>
        <Typography sx={{fontWeight: 'bold', fontSize: '16px'}}>Choose Payment Type</Typography>
        {PaymentTypeValues.map((paymentTypeValue: IPaymentTypeValue) => (
            <PaymentCardOption 
                title={paymentTypeValue.text}
                id={paymentTypeValue.id}
                handleClick={handleClick}
                icon={paymentTypeValue.icon}
                selectedId={selectedPaymentType}
            />
        ))}
    </Box>
  )
}

export default PaymentTypeOptions