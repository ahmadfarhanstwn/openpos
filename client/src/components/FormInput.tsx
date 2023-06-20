import { InputProps, FormControl, Typography, Input as _Input, FormHelperText } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { styled } from '@mui/material/styles'

const Input = styled(_Input)`
  background-color: "#4caf50";
  padding: 0.4rem 0.7rem;
`;

type IFormInputProps = {
    name: string,
    label: string,
} & InputProps

const FormInput: React.FC<IFormInputProps> = ({
    name,
    label,
    ...otherProps
}) => {
    const { control, formState: { errors }} = useFormContext()

    return (
        <Controller
            control={control}
            defaultValue=''
            name={name}
            render={({ field }) => (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography
                        variant='body2'
                        sx={{ color: '#2363eb', mb: 1, fontWeight: 500 }}
                    >
                        {label}
                    </Typography>
                    <Input
                        {...field}
                        fullWidth
                        disableUnderline
                        sx={{ borderRadius: '1rem'}}
                        placeholder={label}
                        error={!!errors[name]}
                        {...otherProps}
                    />
                    <FormHelperText error={!!errors[name]}>
                        {errors[name] ? errors[name]?.message as string : ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default FormInput