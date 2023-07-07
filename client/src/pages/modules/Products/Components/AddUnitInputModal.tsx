import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import FormInput from '../../../../components/FormInput'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AddProductUnitInput, addProductUnitSchema } from '../Schema/AddProductUnitSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProductUnitMutation } from '../../../../redux/api/productApi'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import BaseFormModal from '../../../../components/BaseFormModal'

interface IAddUnitInput {
    open: boolean,
    handleClose: () => void,
    onSuccess: () => void
}

const AddUnitInputModal: React.FC<IAddUnitInput> = ({open, handleClose, onSuccess}) => {
    const addUnitMethods = useForm<AddProductUnitInput>({
        resolver: zodResolver(addProductUnitSchema)
    })

    const { reset, handleSubmit } = addUnitMethods

    const [createProductUnit, {isLoading, isSuccess, isError, error}] = useCreateProductUnitMutation()

    const onSubmitHandlers: SubmitHandler<AddProductUnitInput> = (values) => {
        createProductUnit(values)
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            toast.success('Product Unit created successfully');
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
      }, [isLoading, isSuccess]);

    return (
      <BaseFormModal open={open} handleClose={handleClose} title='Add Product Unit'>
        <FormProvider {...addUnitMethods}>
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

export default AddUnitInputModal