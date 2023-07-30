import { Box, Typography, useTheme } from '@mui/material'
import ProductCart from './Components/ProductCart'
import TransactionDetailCard from './Components/TransactionDetailCard'

const CashierPage = () => {
    const theme = useTheme()

    return (
        <Box p={2} flexGrow={1} display="flex" flexDirection="column">
            <Typography variant='h4' sx={{fontWeight: "bold", marginBottom: '1rem', color: theme.palette.primary.main}}>
                Cashier
            </Typography>
            <Box p={1} flexGrow={2} display='flex' flexDirection='row'>
                <ProductCart />
                <TransactionDetailCard />
            </Box>
        </Box>
    )
}

export default CashierPage