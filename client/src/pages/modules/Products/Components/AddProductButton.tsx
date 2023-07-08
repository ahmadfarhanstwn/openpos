import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddProductModal from './AddProductModal'
import { AddCircleOutlineRounded } from '@mui/icons-material'

interface IAddProductButtonProps {
    getProductsData : () => void,
    unitValues: never[],
    categoryValues: never[],
    refetchProductUnit: () => void,
    refetchProductCategory: () => void
}

const AddProductButton: React.FC<IAddProductButtonProps> = ({
    getProductsData,
    unitValues, 
    categoryValues,
    refetchProductCategory,
    refetchProductUnit
}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        getProductsData()
    }

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' startIcon={<AddCircleOutlineRounded />}>
                New Product
            </Button>
            <AddProductModal 
                handleClose={handleClose} 
                open={open} 
                unitValues={unitValues} 
                categoryValues={categoryValues} 
                refetchProductCategory={refetchProductCategory} 
                refetchProductUnit={refetchProductUnit} 
            />
        </div>
    )
}

export default AddProductButton