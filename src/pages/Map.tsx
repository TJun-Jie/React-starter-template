import React, { useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const MapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return <div>
        <Button onClick={() => setIsOpen(true)}>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Plugs 4
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            5 seats
          </Typography>
          <Typography>1300</Typography>
        </Box>
      </Modal>
    </div>
}