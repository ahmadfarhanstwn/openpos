import React, { useEffect, useState } from 'react'
import BaseFormModal from '../../../../components/BaseFormModal'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { useGetProductByIdQuery, useGetProductCategoriesQuery, useGetProductUnitsQuery, useUpdateProductMutation } from '../../../../redux/api/productApi'
import useTransformedData from '../Helpers/UseTransformedDataCategoryAndUnit'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AddUpdateProductInput, addUpdateProductSchema } from '../Schema/AddProductSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '../../../../components/FormInput'
import DropDownInput from '../../../../components/DropDownInput'
import { LoadingButton } from '@mui/lab'
import { IProduct } from '../../../../redux/api/Types/productTypes'
import { toast } from 'react-toastify'

interface IUpdateProductModalProps {
    open: boolean,
    handleClose: () => void,
    product_id: number,
    onSuccess: () => void
}

const UpdateProductModal: React.FC<IUpdateProductModalProps> = ({
    open, handleClose, product_id, onSuccess
}) => {
    if(!open) return

    const theme = useTheme()

    const methods = useForm<AddUpdateProductInput>({
        resolver: zodResolver(addUpdateProductSchema)
    })

    const { reset, handleSubmit } = methods

    const [ updateProduct, {isLoading, isSuccess, isError, error}] = useUpdateProductMutation()

    const onSubmitHandlers: SubmitHandler<AddUpdateProductInput> = (values: AddUpdateProductInput) => {
        updateProduct({ product_id, ...values });
      };

    const [productValues, setProductValues] = useState<IProduct>();
    const { data: productResponse, refetch} = useGetProductByIdQuery({product_id: product_id});

    useEffect(() => {
      if (open) {
        refetch(); // Refetch the API when the modal is opened
      }
    }, [open, refetch])

    useEffect(() => {
        if (productResponse) {
            setProductValues(productResponse?.data)
            reset(productResponse?.data)
        }
    }, [productResponse, reset])

    const [unitValues, setUnitValues] = useState<any[]>([]);
    const [categoryValues, setCategoryValues] = useState<any[]>([]);
    
    const { data: productUnitsResponse } = useGetProductUnitsQuery();
    const { data: productCategoriesResponse } = useGetProductCategoriesQuery();
    
    const transformUnit = (unit: any) => ({
      label: unit.unit_name,
      value: unit.unit_id,
    });
    
    const transformCategory = (category: any) => ({
      label: category.category_name,
      value: category.category_id,
    });
    
    const transformedUnits = useTransformedData(productUnitsResponse?.data, transformUnit);
    const transformedCategories = useTransformedData(productCategoriesResponse?.data, transformCategory);
    
    useEffect(() => {
      setUnitValues(transformedUnits);
    }, [transformedUnits]);
    
    useEffect(() => {
      setCategoryValues(transformedCategories);
    }, [transformedCategories]);

    useEffect(() => {
        if (isSuccess) {
            reset();
            toast.success('Product created successfully');
            handleClose()
            onSuccess()
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

    return (
        <BaseFormModal open={open} handleClose={handleClose} title='Update Product'>
            <FormProvider {...methods}>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <FormInput name='product_barcode' label='Product Barcode' defaultVal={productValues?.product_barcode} />
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='product_name' label='Product Name' defaultVal={productValues?.product_name} />
                      </Grid>
                      <Grid item xs={12}>
                          <DropDownInput name='unit_id' label='Unit' values={unitValues} />
                      </Grid>
                      <Grid item xs={12}>
                          <DropDownInput name='category_id' label='Category' values={categoryValues} />
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='product_price' label='Product Price' formType='number' defaultVal={productValues?.product_price} />
                      </Grid>
                      <Grid item xs={12}>
                          <FormInput name='discount_percentage' label='Discount (%)' formType='number' defaultVal={productValues?.discount_percentage} />
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
                          Update Product
                      </Typography>
                  </LoadingButton>
              </Box>
          </FormProvider>
        </BaseFormModal>
    )
}

export default UpdateProductModal