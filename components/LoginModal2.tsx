import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const gender = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'NB',
      label: 'Non-Binary',
    },
];

const age_range = [
{
    value: '0-20',
    label: '0-20',
},
{
    value: '21-40',
    label: '21-40',
},
{
    value: '41-60',
    label: '41-60',
},
{
    value: '60+',
    label: '60+',
},
];

const marital_status = [
{
    value: 'Single',
    label: 'Single',
},
{
    value: 'Married',
    label: 'Married',
},
{
    value: 'Happily Married',
    label: 'Happily Married',
},
{
    value: 'Divorced',
    label: 'Divorced',
},

];

export default function FormDialog() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSecond , setOpenSecond] = React.useState(false);
    const handleSecondOpen = () => setOpen(true);
    const handleSecondClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.username;
            const password = formJson.password;
            const age_range = formJson.age_range;
            const gender = formJson.gender;
            const marital_status = formJson.marital_status;
            console.log(name);
            console.log(password);
            console.log(age_range);
            console.log(gender);
            console.log(marital_status);
            handleClose();
          },
        }}
      >
        <DialogTitle>Paiseh Questions</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To access the application, you will need to fill up the following details.
            </DialogContentText>
            
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="username"
                label="Name"
                type="name"
                fullWidth
                variant="standard"
            />

            <TextField
                autoFocus
                required
                margin="dense"
                id="hashed_password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
            />
            
            <TextField
                autoFocus
                required
                margin="dense"
                id="demo-simple-select"
                select
                label="Age Range"
                helperText="Please select your age range"
                fullWidth
                variant = "standard"
                name = "age_range"
                >
                {age_range.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                autoFocus
                required
                margin="dense"
                id="demo-simple-select"
                name="gender"
                label="Gender"
                fullWidth
                variant="standard"
                select
                helperText="Please select your gender"
                >
                {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                autoFocus
                required
                margin="dense"
                id="demo-simple-select"
                name="marital_status"
                label="Marital Status"
                fullWidth
                variant="standard"
                select
                helperText="Please select your marital status"
                >
                {marital_status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>I already have an account</Button>
          <Button type="submit">Next</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}