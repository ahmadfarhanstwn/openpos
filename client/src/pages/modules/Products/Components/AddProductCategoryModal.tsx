import { Box, Grid } from '@mui/material'
import React from 'react'
import FormInput from '../../../../components/FormInput'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import { FormProvider } from 'react-hook-form'
import { useCreateProductCategoryMutation } from '../../../../redux/api/productApi'
import { LoadingButton } from '@mui/lab'
import BaseFormModal from '../../../../components/BaseFormModal'
import { AddProductCategoryInput, addProductCategorySchema } from '../Schema/AddProductCategorySchema'
import useFormUnitAndCategorySubmission from '../Hooks/useFormUnitAndCategorySubmission'

interface IAddProductCategoryProps {
    open: boolean,
    handleClose: () => void,
    onSuccess: () => void
}

const AddProductCategoryModal: React.FC<IAddProductCategoryProps> = ({open, handleClose, onSuccess}) => {
    const { formMethods, onSubmitHandlers, handleSubmit, isLoading } = useFormUnitAndCategorySubmission<AddProductCategoryInput>({
      createMutation: useCreateProductCategoryMutation,
      onSuccess: onSuccess,
      handleClose: handleClose,
      zodObjectSchema: addProductCategorySchema
    });

    return (
      <BaseFormModal open={open} handleClose={handleClose} title='Add Product Category'>
        <FormProvider {...formMethods}>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }} >
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                    <FormInput name='category_name' label='Category Name' sx={{width: '75%', paddingRight: '1rem'}} />
                    <LoadingButton disableElevation loading={isLoading} type='submit' variant='contained' startIcon={<AddCircleOutlineRounded />} sx={{height: '80%', margin: '0.25rem 0'}}>
                        Add New Category
                    </LoadingButton>
                </Grid>
              </Grid>
            </Box>
        </FormProvider>
      </BaseFormModal>
    )
}

export default AddProductCategoryModal