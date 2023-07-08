import { TextField } from '@mui/material'
import React from 'react'

interface ISearchTextInputProps {
    label: string,
    value: string,
    handleChange: (value: string) => void
}

const SearchTextInput: React.FC<ISearchTextInputProps> = ({label, value, handleChange}) => {
  return (
    <TextField id="outlined-search" label={label} value={value} onChange={(event) => handleChange(event.target.value)} type="search" />
  )
}

export default SearchTextInput