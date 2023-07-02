import { MenuItem, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type IMenuItemsValues = {
    value: string,
    label: string
}

type IDropDownInputProps = {
    name: string,
    label: string,
    values: IMenuItemsValues[]
} & TextFieldProps

const DropDownInput: React.FC<IDropDownInputProps> = ({
    name,
    label,
    values,
    ...otherProps
}) => {
    const { control, formState: {errors}} = useFormContext()

    return (
        <Controller
            control={control}
            defaultValue={values[0]?.value ? values[0].value : 1}
            name={name}
            render={({ field }) => (
                <TextField 
                    {...field}
                    fullWidth
                    id="outlined-select-currency"
                    name={name}
                    label={label}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name]?.message as string : ''}
                    sx={{ borderRadius: '1rem'}}
                    select
                    defaultValue={values[0]?.value ? values[0].value : 1}
                    {...otherProps}
                >
                    {values.map((value) => (
                        <MenuItem key={value.value} value={value.value}>
                            {value.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    )
}

export default DropDownInput