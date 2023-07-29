import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ConfirmationAlertModal from '../../../../components/ConfirmationAlertModal'
import { useCancelTransactionMutation } from '../../../../redux/api/cashierApi';
import { useAppSelector } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { setTransactionId } from '../../../../redux/features/transactionSlice';

const CancelTransactionButton = () => {
    const transactionId = useAppSelector((state) => state.transactionState.transactionId)
    const dispatch = useDispatch()

    const [openConfirmationAlertModal, setOpenConfirmationAlertModal] = useState<boolean>(false);

    const handleOpenConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(true);
    };

    const handleCloseConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(false);
    };

    const [cancelTransaction, {isSuccess, isError, error}] = useCancelTransactionMutation()

    const handleCancelTransaction = () => {
        cancelTransaction(transactionId)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setTransactionId(0));
            handleCloseConfirmationAlertModal();
        }
    
        if (isError) {
          console.log(error);
        }
      }, [isSuccess, isError, transactionId, error]);

    return (
        <>
            <Button onClick={handleOpenConfirmationAlertModal} sx={{marginRight: '1rem', height: '70%', fontSize: '16px', width: '50%'}} variant='text'>
                CANCEL
            </Button>
            <ConfirmationAlertModal
                open={openConfirmationAlertModal} 
                handleAgree={() => handleCancelTransaction()}
                handleClose={handleCloseConfirmationAlertModal}
                title="Cancel Transaction"
                subtitle={`Are you sure you want to cancel this transaction ?`}   
            /> 
        </>
    )
}

export default CancelTransactionButton