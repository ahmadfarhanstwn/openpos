import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../../../components/FlexBetween'
import { Add } from '@mui/icons-material'
import TableProductCart from './TableProductCart'

const ProductCart = () => {
    const theme = useTheme()

    return (
        <Card sx={{
            backgroundImage: "none", 
            backgroundColor: theme.palette.background.default, 
            borderRadius: "0.55rem",
            width: '75%',
            marginRight: '2rem'
        }}>
            <CardContent>
                <Box flexGrow={1} display="flex" justifyContent='space-between' flexDirection="row" sx={{marginBottom: '1rem'}}>
                    <FlexBetween>
                        <Typography variant='h5' sx={{fontWeight: "bold", fontSize: '14px', margin: '50 0'}}>Sunday, 09 July 2023</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Button startIcon={<Add />} sx={{marginRight: '1rem', height: '70%', fontSize: '12px'}} variant='contained'>
                            Add Customer
                        </Button>
                        <Button startIcon={<Add />} sx={{marginRight: '1rem', height: '70%', fontSize: '12px'}} variant='contained'>
                            Add Doctor
                        </Button>
                        <Button startIcon={<Add />} sx={{height: '70%', fontSize: '12px'}} variant='outlined'>
                            Add Prescription
                        </Button>
                    </FlexBetween>
                </Box>
                <TableProductCart />
            </CardContent>
        </Card>
    )
}

export default ProductCart