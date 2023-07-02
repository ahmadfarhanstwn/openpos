import { Delete, Edit } from "@mui/icons-material";
import { FormControlLabel, IconButton } from "@mui/material";
import React, {useEffect, useState} from "react";
import ConfirmationAlertModal from "../../../../components/ConfirmationAlertModal";
import { useDeleteProductMutation } from "../../../../redux/api/productApi";
import { toast } from "react-toastify";

interface IActionProps {
    product_id: number,
    product_name?: string
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


export const DeleteProductButton: React.FC<IActionProps> = ({ product_id, product_name }) => {
    const [openConfirmationAlertModal, setOpenConfirmationAlertModal] = useState<boolean>(false);

    const handleOpenConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(true);
    };

    const handleCloseConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(false);
        console.log(openConfirmationAlertModal)
    };

    const [deleteProduct, {isLoading, isSuccess}] = useDeleteProductMutation()

    const handleDeleteClick = (id : number) => {
        deleteProduct({product_id: id})
    }

    //TODO : how to make modal close when click no and refresh after delete
    useEffect(() => {
        if (isSuccess) {
          toast.success(`Product "${product_name}" deleted successfully`);
          handleCloseConfirmationAlertModal()
        }
      }, [isLoading]);

    return (
        <FormControlLabel
            control={
                <IconButton color="error" onClick={handleOpenConfirmationAlertModal} >
                    <Delete style={{ color: 'blue[500]' }} />
                    <ConfirmationAlertModal 
                        open={openConfirmationAlertModal} 
                        handleAgree={() => handleDeleteClick(product_id)}
                        handleClose={handleCloseConfirmationAlertModal}
                        title="Delete Product"
                        subtitle={`Are you sure you want to delete product "${product_name}" ?`}    
                    />
                </IconButton>
            }
            label=''
        />
    )
};