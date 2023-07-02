import { Input as _Input, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type IFormInputProps = {
    name: string,
    label: string,
    defaultVal?: string | number,
    formType?: string
} & TextFieldProps

const FormInput: React.FC<IFormInputProps> = ({
    name,
    label,
    defaultVal,
    formType,
    ...otherProps
}) => {
    const { control, formState: { errors }, setValue} = useFormContext()

    const handleValueChange = (value: string) => {
        const parsedValue = parseFloat(value);
        if (formType === 'number') {
            setValue(name, isNaN(parsedValue) ? '' : parsedValue, { shouldValidate: true });
        } else {
            setValue(name, value)
        }
    };

    return (
        <Controller
            control={control}
            defaultValue={defaultVal !== undefined ? String(defaultVal) : ''}
            name={name}
            render={({ field }) => (
                <TextField 
                    {...field}
                    fullWidth
                    name={name}
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name]?.message as string : ''}
                    sx={{ borderRadius: '1rem'}}
                    type={formType ? formType : 'text'}
                    onChange={(event) => handleValueChange(event.target.value)}
                    {...otherProps}
                />
            )}
        />
    )
}

export default FormInput