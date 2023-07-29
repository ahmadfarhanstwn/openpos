import { Button } from '@mui/material'
import React, { useState } from 'react'
import ConfirmationAlertModal from '../../../../components/ConfirmationAlertModal'
import { useDispatch } from 'react-redux';
import { setTransactionId } from '../../../../redux/features/transactionSlice';

const DraftTransactionButton = () => {
    const dispatch = useDispatch()

    const [openConfirmationAlertModal, setOpenConfirmationAlertModal] = useState<boolean>(false);

    const handleOpenConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(true);
    };

    const handleCloseConfirmationAlertModal = () => {
        setOpenConfirmationAlertModal(false);
    };

    const handleCancelTransaction = () => {
        dispatch(setTransactionId(0));
        handleCloseConfirmationAlertModal();
    }

    return (
        <>
            <Button onClick={handleOpenConfirmationAlertModal} sx={{marginRight: '1rem', height: '70%', fontSize: '16px', width: '50%'}} variant='outlined'>
                DRAFT
            </Button>
            <ConfirmationAlertModal
                open={openConfirmationAlertModal} 
                handleAgree={() => handleCancelTransaction()}
                handleClose={handleCloseConfirmationAlertModal}
                title="Draft Transaction"
                subtitle={`Are you sure you want to save this transaction as a draft ?`}   
            /> 
        </>
    )
}

export default DraftTransactionButton