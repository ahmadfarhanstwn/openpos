import { useEffect, useState } from "react";
import { FormControlLabel, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ConfirmationAlertModal from "../../../../components/ConfirmationAlertModal";
import { useDeleteTransactionDetailMutation, useLazyGetTransactionDetailRowsQuery } from "../../../../redux/api/cashierApi";

interface IDeleteTransactionDetailProps {
    transaction_id: number,
    transaction_detail_id: number,
    no: number
}

export const DeleteTransactionDetail: React.FC<IDeleteTransactionDetailProps> = ({ 
    transaction_id,
    transaction_detail_id,
    no
 }) => {
    const [openConfirmationAlertModal, setOpenConfirmationAlertModal] = useState<boolean>(false);

    const handleOpenConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(true);
    };

    const handleCloseConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(false);
    };

    const [DeleteTransactionDetail, { isSuccess }] = useDeleteTransactionDetailMutation()

    const handleDeleteClick = () => {
        DeleteTransactionDetail({transaction_id, transaction_detail_id})
    }

    const [ getTransactionDetails ] = useLazyGetTransactionDetailRowsQuery()

    useEffect(() => {
        if (isSuccess) {
          handleCloseConfirmationAlertModal()
          getTransactionDetails({transaction_id})
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
                        handleAgree={() => handleDeleteClick()}
                        handleClose={handleCloseConfirmationAlertModal}
                        title="Delete Product"
                        subtitle={`Are you sure you want to delete row number ${no} ?`}   
                    /> 
                </div>
            } 
            label=''
        />
    )
};