import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import { useCallback, useEffect, useState} from 'react'
import {  useSelector } from 'react-redux';
import { useGetProductCategoriesQuery, useGetProductUnitsQuery, useLazyGetPaginateProductsQuery } from '../../../redux/api/productApi';
import ProductTable from './Components/ProductTable';
import { RootState } from '../../../redux/store';
import { IProductTransformed } from '../../../redux/api/Types/productTypes';
import AddProductButton from './Components/AddProductButton';

const pageSize = 10

const ProductPage = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [productBarcodeFilter, setProductBarcodeFilter] = useState('')
    const [productNameFilter, setProductNameFilter] = useState('')
    const [productUnitFilter, setProductUnitFilter] = useState('')
    const [productCategoryFilter, setProductCategoryFilter] = useState('')

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeProductBarcodeFilter = (value: string) => {
        setProductBarcodeFilter(value)
    }

    const handleChangeProductNameFilter = (value: string) => {
        setProductNameFilter(value)
    }

    const handleChangeProductUnitFilter = (value: string) => {
        setProductUnitFilter(value)
        console.log(productUnitFilter)
    }

    const handleChangeProductCategoryFilter = (value: string) => {
        setProductCategoryFilter(value)
    }

    const [unitValues, setUnitValues] = useState([])
    const [categoryValues, setCategoryValues] = useState([])

    const { data : productUnitsResponse, refetch : refetchProductUnit } = useGetProductUnitsQuery()
    const { data : productCategoriesResponse, refetch: refetchProductCategory } = useGetProductCategoriesQuery()

    useEffect(() => {
        if (productUnitsResponse) {
            const productUnitsData = productUnitsResponse.data

            setUnitValues(
                productUnitsData.map((unit : any) => (
                    {label: unit.unit_name, value : unit.unit_id}
                ))
            )
        }
    }, [productUnitsResponse])

    useEffect(() => {
        if (productCategoriesResponse) {
            const productCategoriesData = productCategoriesResponse.data

            setCategoryValues(
                productCategoriesData.map((category : any) => (
                    {label: category.category_name, value : category.category_id}
                ))
            )
        }
    }, [productCategoriesResponse])

    const [getPaginateProducts] = useLazyGetPaginateProductsQuery();

    const getProductsData = useCallback(() => {
        getPaginateProducts({
            current_page: page, 
            per_page: pageSize, 
            product_barcode: productBarcodeFilter, 
            product_name: productNameFilter, 
            product_category: productCategoryFilter, 
            product_unit: productUnitFilter
        });
    }, [page, pageSize, productBarcodeFilter, productNameFilter, productCategoryFilter, productUnitFilter])

    useEffect(() => {
        getProductsData()
    }, [page, pageSize, productBarcodeFilter, productNameFilter, productCategoryFilter, productUnitFilter])

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
                        <AddProductButton 
                            getProductsData={getProductsData} 
                            unitValues={unitValues}
                            categoryValues={categoryValues}
                            refetchProductUnit={refetchProductUnit}
                            refetchProductCategory={refetchProductCategory}
                        />
                    </Box>
                    <ProductTable 
                        data={transformedRows} 
                        page={page}
                        pageSize={pageSize}
                        onSuccess={getProductsData} 
                        handleChangePage={handleChangePage}
                        productBarcodeFilter={productBarcodeFilter}
                        handleChangeProductBarcodeFilter={handleChangeProductBarcodeFilter}
                        productNameFilter={productNameFilter}
                        handleChangeProductNameFilter={handleChangeProductNameFilter}
                        productUnitFilter={productUnitFilter}
                        handleChangeProductUnitFilter={handleChangeProductUnitFilter}
                        productCategoryFilter={productCategoryFilter}
                        handleChangeProductCategoryFilter={handleChangeProductCategoryFilter}
                        unitValues={unitValues}
                        categoryValues={categoryValues}
                    />
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProductPage