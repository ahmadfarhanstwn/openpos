import { useEffect, useState } from "react";
import { useDeleteProductMutation } from "../../../../redux/api/productApi";
import { FormControlLabel, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ConfirmationAlertModal from "../../../../components/ConfirmationAlertModal";
import { toast } from "react-toastify";

interface IDeleteProductButtonProps {
    product_id: number,
    product_name: string,
    onDeleteSuccess: () => void
}

export const DeleteProductButton: React.FC<IDeleteProductButtonProps> = ({ product_id, product_name, onDeleteSuccess }) => {
    const [openConfirmationAlertModal, setOpenConfirmationAlertModal] = useState<boolean>(false);

    const handleOpenConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(true);
    };

    const handleCloseConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(false);
    };

    const [deleteProduct, { isSuccess }] = useDeleteProductMutation()

    const handleDeleteClick = (id : number) => {
        deleteProduct({product_id: id})
    }

    useEffect(() => {
        if (isSuccess) {
          toast.success(`Product "${product_name}" deleted successfully`);
          handleCloseConfirmationAlertModal()
          onDeleteSuccess()
        }
      }, [isSuccess]);

    return (
        <FormControlLabel
            control={
                <div>
                    <IconButton color="error" onClick={handleOpenConfirmationAlertModal} >
                        <Delete style={{ color: 'blue[500]' }} />
                    </IconButton>
                    <ConfirmationAlertModal 
                        open={openConfirmationAlertModal} 
                        handleAgree={() => handleDeleteClick(product_id)}
                        handleClose={handleCloseConfirmationAlertModal}
                        title="Delete Product"
                        subtitle={`Are you sure you want to delete product "${product_name}" ?`}   
                    /> 
                </div>
            } 
            label=''
        />
    )
};