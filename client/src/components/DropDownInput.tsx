import { FormControl, Typography, FormHelperText, Select, MenuItem } from '@mui/material'
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
}
const DropDownInput: React.FC<IDropDownInputProps> = ({
    name,
    label,
    values,
}) => {
    const { control, formState: {errors}} = useFormContext()

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
                    <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={label}
                        // onChange={handleChange}
                        name={name}
                        fullWidth
                        required
                    >
                        {values.map((value, index) => (
                            <MenuItem key={value.value} defaultChecked={index === 0} value={value.value}>{value.label}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!errors[name]}>
                        {errors[name]?.message as string}
                    </FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default DropDownInput