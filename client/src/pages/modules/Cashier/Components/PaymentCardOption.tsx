import { Card, CardActionArea, CardContent, SvgIconProps, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../../components/FlexBetween'
import { CheckCircleOutline } from '@mui/icons-material'

interface IPaymentCardOptionProps {
    title : string,
    id : string,
    selectedId: string,
    icon: React.ReactElement<SvgIconProps>,
    handleClick: (paymentTypeId: string) => void
}

const PaymentCardOption: React.FC<IPaymentCardOptionProps> = (
    {
        title,
        id,
        selectedId,
        icon,
        handleClick
    }
) => {
  return (
    <Card 
        style={{border: selectedId == id ? '1px solid green' : ''}} 
        variant='outlined' 
        sx={{height: "2.5rem"}}>
        <CardActionArea onClick={() => handleClick(id)}>
            <CardContent sx={{padding: '.2rem'}}>
                <FlexBetween>
                    <FlexBetween sx={{paddingTop: '.1rem'}}>
                        {icon}
                        <Typography sx={{marginLeft: '.5rem', fontSize: '16px'}}>{title}</Typography>
                    </FlexBetween>
                    {selectedId == id && <CheckCircleOutline color='success' />}
                </FlexBetween>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default PaymentCardOption