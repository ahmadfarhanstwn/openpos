import { Backdrop, Box, Fade, Modal, Typography, useTheme } from '@mui/material';
import React, { ReactNode } from 'react'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '1em',
    p: 4,
};

interface IBaseModalProps {
  open : boolean,
  handleClose: () => void,
  title: string,
  children: ReactNode
}

const BaseFormModal : React.FC<IBaseModalProps> = (
  {open, handleClose, title, children}
) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
            {title}
          </Typography>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}

export default BaseFormModal