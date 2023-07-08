import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { IMenuItemsValues } from './DropDownInput'

interface ISearchSelectInputProps {
    label: string,
    value: string,
    itemValues: IMenuItemsValues[],
    handleChange: (value: string) => void
}

const SearchSelectInput: React.FC<ISearchSelectInputProps> = ({
    label, value, itemValues, handleChange
}) => {
  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={(event) => handleChange(event.target.value)}
        >
            <MenuItem value=''>-</MenuItem>
            {itemValues.map((itemValue: IMenuItemsValues) => (
                <MenuItem value={itemValue.label}>{itemValue.label}</MenuItem>
            ))}
        </Select>
    </FormControl>
  )
}

export default SearchSelectInput