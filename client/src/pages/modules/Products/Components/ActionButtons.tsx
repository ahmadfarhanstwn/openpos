import { Delete, Edit } from "@mui/icons-material";
import { FormControlLabel, IconButton } from "@mui/material";
import React from "react";

interface IActionProps {
    product_id: number
}

export const EditProductButton: React.FC<IActionProps> = ({ product_id }) => {
    const handleEditClick = (id : number) => {
       console.log(id)
    }

    return (
        <FormControlLabel 
            control={
                <IconButton color="warning"  onClick={() => handleEditClick(product_id)} >
                    <Edit style={{ color: 'blue[500]' }} />
                </IconButton>
            }
            label=''
        />
    )
};


export const DeleteProductButton: React.FC<IActionProps> = ({ product_id }) => {
    const handleDeleteClick = (id : number) => {
        console.log(id)
    }

    return (
        <FormControlLabel
            control={
                <IconButton color="error" onClick={() => handleDeleteClick(product_id)} >
                    <Delete style={{ color: 'blue[500]' }} />
                </IconButton>
            }
            label=''
        />
    )
};