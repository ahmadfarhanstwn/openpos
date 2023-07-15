import { Box, Card, CardContent, OutlinedInput, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../../components/FlexBetween'
import ProductCart from './Components/ProductCart'

const CashierPage = () => {
    const theme = useTheme()

    return (
        <Box p={2} flexGrow={1} display="flex" flexDirection="column">
            <Typography variant='h4' sx={{fontWeight: "bold", marginBottom: '1rem', color: theme.palette.primary.main}}>
                Cashier
            </Typography>
            <Box p={1} flexGrow={2} display='flex' flexDirection='row'>
                <ProductCart />
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
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default CashierPage