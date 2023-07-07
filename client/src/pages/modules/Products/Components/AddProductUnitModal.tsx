import { Box, Grid } from '@mui/material'
import React from 'react'
import FormInput from '../../../../components/FormInput'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import { FormProvider } from 'react-hook-form'
import { AddProductUnitInput, addProductUnitSchema } from '../Schema/AddProductUnitSchema'
import { useCreateProductUnitMutation } from '../../../../redux/api/productApi'
import { LoadingButton } from '@mui/lab'
import BaseFormModal from '../../../../components/BaseFormModal'
import useFormUnitAndCategorySubmission from '../Hooks/useFormUnitAndCategorySubmission'

interface IAddProductUnitProps {
    open: boolean,
    handleClose: () => void,
    onSuccess: () => void
}

const AddProductUnitModal: React.FC<IAddProductUnitProps> = ({open, handleClose, onSuccess}) => {

    const { formMethods, onSubmitHandlers, handleSubmit, isLoading } = useFormUnitAndCategorySubmission<AddProductUnitInput>({
      createMutation: useCreateProductUnitMutation,
      onSuccess: onSuccess,
      handleClose: handleClose,
      zodObjectSchema: addProductUnitSchema
    });

    return (
      <BaseFormModal open={open} handleClose={handleClose} title='Add Product Unit'>
        <FormProvider {...formMethods}>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandlers)} sx={{ mt: 3 }} >
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                    <FormInput name='unit_name' label='Unit Name' sx={{width: '75%', paddingRight: '1rem'}} />
                    <LoadingButton disableElevation loading={isLoading} type='submit' variant='contained' startIcon={<AddCircleOutlineRounded />} sx={{height: '80%', margin: '0.25rem 0'}}>
                        Add New Unit
                    </LoadingButton>
                </Grid>
              </Grid>
            </Box>
        </FormProvider>
      </BaseFormModal>
    )
}

export default AddProductUnitModal