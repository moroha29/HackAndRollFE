import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

export default function LoginModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Disabled"
                                defaultValue="Hello World"
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Read Only"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField id="outlined-search" label="Search field" type="search" />
                            <TextField
                                id="outlined-helperText"
                                label="Helper text"
                                defaultValue="Default Value"
                                helperText="Some important text"
                            />
                        </div>
                    <Button variant="text" onClick={handleClose}>SUBMIT</Button>
                </Box>
                </Box>
            </Modal>
        </div>
    );
}