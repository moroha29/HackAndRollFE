import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { RegisterData,marital_status,age_range,gender } from '@/models/login';


export default function RegisterForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        password: '',
        age_range: '',
        gender: '',
        marital_status: '',
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            console.log("token detected")
            handleClose();
        }
    }, []);

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

            const response = await fetch(`http://localhost:8000/users/register/`, {
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
          <Button className='w-48 shadow-2xl bg-sky-500 text-white' variant="outlined" onClick={handleOpen}>
              Create Account!
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Welcome to Paiseh Questions</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      To create an account, you will need to fill up the following details.
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
                  <Button onClick={handleSubmit}>Create Account</Button>
                  <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
