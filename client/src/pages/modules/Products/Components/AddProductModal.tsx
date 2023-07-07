import React, { useEffect, useState } from 'react'
import BaseFormModal from '../../../../components/BaseFormModal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProductMutation, useGetProductCategoriesQuery, useGetProductUnitsQuery } from '../../../../redux/api/productApi'
import { toast } from 'react-toastify'
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material'
import FormInput from '../../../../components/FormInput'
import { LoadingButton } from '@mui/lab'
import { AddUpdateProductInput, addUpdateProductSchema } from '../Schema/AddProductSchema'
import DropDownInput from '../../../../components/DropDownInput'
import 'react-toastify/dist/ReactToastify.css';
import { Add } from '@mui/icons-material'
import AddProductUnitModal from './AddProductUnitModal'
import AddProductCategoryModal from './AddProductCategoryModal'

interface IAddProductModalProps {
    open: boolean,
    handleClose: () => void
}

const AddProductModal: React.FC<IAddProductModalProps> = ({open, handleClose}) => 
{
    if(!open) return

    const theme = useTheme()

    const [unitValues, setUnitValues] = useState([])
    const [categoryValues, setCategoryValues] = useState([])

    const methods = useForm<AddUpdateProductInput>({
        resolver: zodResolver(addUpdateProductSchema)
    })

    const { reset, handleSubmit } = methods

    const [createProduct, {isLoading, isSuccess, isError, error}] = useCreateProductMutation()

    const onSubmitHandlers: SubmitHandler<AddUpdateProductInput> = (values) => {
        createProduct(values)
    }

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

    useEffect(() => {
        if (isSuccess) {
            reset();
            toast.success('Product created successfully');
            handleClose()
        }
    
        if (isError) {
          console.log(error);
          if (Array.isArray((error as any).data.error)) {
            (error as any).data.error.forEach((el: any) =>
              toast.error(el.message, {
                position: 'top-right',
              })
            );
          } else {
            toast.error((error as any).data.message, {
              position: 'top-right',
            });
          }
        }
      }, [isLoading]);

      const [showAddUnitModal, setShowAddUnitModal] = useState(false)

      const handleClickShowAddUnitModal = () => {
        setShowAddUnitModal(true)
      }

      const handleCloseAddUnitModal = () => {
        setShowAddUnitModal(false)
      } 

      const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)

      const handleClickShowAddCategoryModal = () => {
        setShowAddCategoryModal(true)
      }

      const handleCloseAddCategoryModal = () => {
        setShowAddCategoryModal(false)
      } 

    return (
        <BaseFormModal open={open} handleClose={handleClose} title='Add Product' >
            <FormProvider {...methods}>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <FormInput name='product_barcode' label='Product Barcode' />
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='product_name' label='Product Name' />
                      </Grid>
                      <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                          <DropDownInput name='unit_id' label='Unit' values={unitValues} sx={{width: '95%'}} />
                          <Box>
                            <IconButton sx={{ padding: '1rem 0.5rem'}} onClick={handleClickShowAddUnitModal}>
                                <Add />
                            </IconButton>
                          </Box>
                      </Grid>
                      <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                          <DropDownInput name='category_id' label='Category' values={categoryValues} sx={{width: '95%'}} />
                          <Box>
                            <IconButton sx={{ padding: '1rem 0.5rem'}} onClick={handleClickShowAddCategoryModal}>
                                <Add />
                            </IconButton>
                          </Box>
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='product_price' label='Product Price' formType='number' />
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='discount_percentage' label='Discount (%)' formType='number' />
                      </Grid>
                  </Grid>
                  <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                      disableElevation
                      loading={isLoading}
                  >
                      <Typography color={theme.palette.primary.mainText}>
                          Add Product
                      </Typography>
                  </LoadingButton>
              </Box>
          </FormProvider>
          <AddProductUnitModal open={showAddUnitModal} handleClose={handleCloseAddUnitModal} onSuccess={refetchProductUnit} />
          <AddProductCategoryModal open={showAddCategoryModal} handleClose={handleCloseAddCategoryModal} onSuccess={refetchProductCategory} />
        </BaseFormModal>
    )
}

export default AddProductModal