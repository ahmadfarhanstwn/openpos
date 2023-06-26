import { AddCircleOutlineRounded } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material'
import React, {useCallback, useEffect, useState} from 'react'
import {  useSelector } from 'react-redux';
import { useGetPaginateProductsQuery } from '../../../redux/api/productApi';
import ProductTable from './Components/ProductTable';
import { RootState } from '../../../redux/store';
import { IProductTransformed } from '../../../redux/api/types';

const ProductPage = () => {
    const theme = useTheme();

    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 10,
      });

    const { isLoading } = useGetPaginateProductsQuery({current_page: paginationModel.page, per_page: paginationModel.pageSize});

    const rows = useSelector((state: RootState) => state.productState.products)
    const rowCount = useSelector((state: RootState) => state.productState.totalData)
    const [transformedRows, setTransformedRows] = useState<IProductTransformed[]>([])

    useEffect(() => {
        const transformedData: IProductTransformed[] = rows.map((row) => ({
            id: row.product_id, // Generate a unique identifier
            ...row, // Spread the existing row data
          }));

        setTransformedRows(transformedData)
    }, [rows])

    const onClickCreateProductModal = useCallback(() => {
        console.log('Open modal')
    }, [])

    return (
        <Box p={2} flexGrow={1} display="flex" flexDirection="column">
            <Typography variant='h4' sx={{fontWeight: "bold", marginBottom: '2rem', color: theme.palette.primary.main}}>Products</Typography>
            <Card sx={{backgroundImage: "none", backgroundColor: theme.palette.background.default, borderRadius: "0.55rem"}}>
                <CardContent>
                    <Box flexGrow={1} display="flex" flexDirection="row" sx={{marginBottom: '1rem'}}>
                        <Button onClick={onClickCreateProductModal} variant='contained' startIcon={<AddCircleOutlineRounded />}>
                            New Product
                        </Button>
                    </Box>
                    <ProductTable data={transformedRows} isLoading={isLoading} paginationModel={paginationModel} setPaginationModel={setPaginationModel} rowCount={rowCount} />
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProductPage