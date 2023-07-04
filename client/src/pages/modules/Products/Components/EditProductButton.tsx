import { Edit } from "@mui/icons-material";
import { FormControlLabel, IconButton } from "@mui/material";
import React, { useState } from "react";
import UpdateProductModal from "./UpdateProductModal";

interface IEditProductButtonProps {
    product_id: number,
    onUpdateSuccess: () => void,
}

export const EditProductButton: React.FC<IEditProductButtonProps> = ({ product_id, onUpdateSuccess }) => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false)

    const handleOpenUpdateModal = () => {
        setOpenUpdateModal(true)
    }

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false)
    }

    return (
        <FormControlLabel 
            control={
                <div>
                    <IconButton color="warning"  onClick={handleOpenUpdateModal} >
                        <Edit style={{ color: 'blue[500]' }} />
                    </IconButton>
                    <UpdateProductModal 
                        open={openUpdateModal} 
                        handleClose={handleCloseUpdateModal} 
                        product_id={product_id} 
                        onSuccess={onUpdateSuccess}
                    />
                </div>
            }
            label=''
        />
    )
};