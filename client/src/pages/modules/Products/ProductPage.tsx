import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import { useCallback, useEffect, useState} from 'react'
import {  useSelector } from 'react-redux';
import { useLazyGetPaginateProductsQuery } from '../../../redux/api/productApi';
import ProductTable from './Components/ProductTable';
import { RootState } from '../../../redux/store';
import { IProductTransformed } from '../../../redux/api/Types/productTypes';
import AddProductButton from './Components/AddProductButton';

const pageSize = 10

const ProductPage = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const [getPaginateProducts] = useLazyGetPaginateProductsQuery();

    const getProductsData = useCallback(() => {
        getPaginateProducts({current_page: page, per_page: pageSize});
    }, [page, pageSize])

    useEffect(() => {
        getProductsData()
    }, [])

    const rows = useSelector((state: RootState) => state.productState.products)
    const [transformedRows, setTransformedRows] = useState<IProductTransformed[]>([])

    useEffect(() => {
        const transformedData: IProductTransformed[] = rows.map((row) => ({
            id: row.product_id, // Generate a unique identifier
            ...row, // Spread the existing row data
          }));

        setTransformedRows(transformedData)
    }, [rows])

    return (
        <Box p={2} flexGrow={1} display="flex" flexDirection="column">
            <Typography variant='h4' sx={{fontWeight: "bold", marginBottom: '2rem', color: theme.palette.primary.main}}>Products</Typography>
            <Card sx={{backgroundImage: "none", backgroundColor: theme.palette.background.default, borderRadius: "0.55rem"}}>
                <CardContent>
                    <Box flexGrow={1} display="flex" flexDirection="row" sx={{marginBottom: '1rem'}}>
                        <AddProductButton getProductsData={getProductsData} />
                    </Box>
                    <ProductTable 
                        data={transformedRows} 
                        page={page}
                        pageSize={pageSize}
                        onSuccess={getProductsData} 
                        handleChangePage={handleChangePage}
                    />
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProductPage