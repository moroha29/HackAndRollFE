import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { LoginData} from '@/models/login';
import { Snackbar } from '@mui/material';
import { redirect } from 'next/navigation';



export default function LoginForm() {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorFound, setErrorFound] = useState(false);
    const [formData, setFormData] = useState<LoginData>({
        username: '',
        password: '',
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            username: '',
            password: '',
        })
    }
    const handleErrorClose = () =>{
        setErrorFound(false);
    }
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
    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        const loginPayload = {
            "name": formData.username,
            "hashed_password": formData.password,
        };
        if(!formData.username || !formData.password){
            setErrorMessage("Please fill in all required fields");
            setErrorFound(true);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/users/login/`, { // Replace with your login endpoint
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginPayload),
            });
            console.log(loginPayload);
            if (!response.ok) {
                if (response.status==401){
                    setErrorMessage("Login credentials are wrong please check again!");
                    setErrorFound(true);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            // Assuming the JWT token is in the 'token' field of the response
            const token = data
            if (token) {
                console.log("Received JWT Token:", token);
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('jwtToken', token);
                // You can now use this token for authenticated requests to your backend
                redirect("/question");
            }

            handleClose();
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
      <React.Fragment>
          <Button className="w-48 shadow-2xl bg-sky-500 text-white" variant="outlined" onClick={handleOpen} >
              Login!
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Welcome to Paiseh Questions</DialogTitle>
              <DialogContent>
                <DialogContentText>
                    To access the application, please fill in your username and password.
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin}>Login</Button> {/* Login button */}
                <Button onClick={handleClose}>Cancel</Button> {/* Close button */}
            </DialogActions>
      </Dialog>
      <Snackbar
        open={errorFound}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        message={errorMessage}
        />
    </React.Fragment>
  );
}
