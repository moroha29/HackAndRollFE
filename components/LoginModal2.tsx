import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import {ChangeEvent, FormEvent, useState} from "react";

const gender = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'nonbinary',
      label: 'Non-Binary',
    },
];

const age_range = [
    {
        'value': '<18',
        'label': '<18',
    },
    {
        'value': '18-24',
        'label': '18-24',
    },
    {
        'value': '25-29',
        'label': '25-29',
    },
    {
        'value': '30-39',
        'label': '30-39',
    },
    {
        'value': '40-49',
        'label': '40-49',
    },
    {
        'value': '50+',
        'label': '50+',
    },
]

const marital_status = [
{
    value: 'single',
    label: 'single',
},
    {
        value: 'attached',
        label: 'attached',
    },
{
    value: 'married',
    label: 'married',
}
];
interface FormData {
    username: string;
    password: string;
    age_range: string;
    gender: string;
    marital_status: string;
}

export default function FormDialog() {
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        age_range: '',
        gender: '',
        marital_status: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(formData); // For debugging
        const payload = {
            name: formData.username,
            hashed_password: formData.password,
            age_range: formData.age_range,
            gender: formData.gender,
            marital_status: formData.marital_status,
        };
        try {

            const response = await fetch('http://localhost:8000/users/register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Assuming the JWT token is in the 'token' field of the response
            const token = data.token;
            if (token) {
                console.log("Received JWT Token:", token);
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('jwtToken', token);
                // You can now use this token for authenticated requests to your backend
            }

            handleClose();
        } catch (error) {
            console.error('Error sending registration data:', error);
        }
    };


    return (
      <React.Fragment>
          <Button variant="outlined" onClick={handleOpen}>
              Open form dialog
          </Button>
          <Dialog open={open} onClose={handleClose}>
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
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                  <Button onClick={handleSubmit}>Next</Button>
              </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
