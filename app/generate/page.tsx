"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Card, IconButton} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from '@material-ui/icons/Settings';
import Navbar from "@/components/NavBar";
export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['']);
    const handleOptionChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newOptions = options.map((option, i) => i === index ? event.target.value : option);
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']); // Add a new empty option
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const fetchSuggestedQuery = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await fetch('http://localhost:8000/gpt/generated_question/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setQuestion(data.question); // Update the question
            setOptions(data.options); // Update the options
        } catch (error) {
            console.error('Error fetching suggested query:', error);
        }
    };
    const handleSuggestQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetchSuggestedQuery();
    };

    const handleSubmitQuestion = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const payload = {
            question: question,
            options: options.filter(option => option.trim() !== ''), // Filter out empty options
            answer: []
        };

        try {
            const response = await fetch('http://localhost:8000/questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle successful question submission
            // E.g., clear the form, display a success message, etc.
            setQuestion('');
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <Card>
            <Box component="form" onSubmit={handleSubmitQuestion}>
                <TextField
                    fullWidth
                    label="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    margin="normal"
                    variant="filled"
                    multiline
                    className='mb-5'
                />
                {options.map((option, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={2}>
                        <TextField
                            fullWidth
                            label={`Option ${index + 1}`}
                            value={option}
                            onChange={handleOptionChange(index)}
                            variant="outlined"
                            sx={{ my: 0.5 }}
                        />
                        <IconButton onClick={() => handleRemoveOption(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <div className='columns-12 mt-3'>
                    <Button startIcon={<AddIcon />} onClick={handleAddOption} variant="outlined">
                        Add Option
                    </Button>
                </div>
                <div className='columns-12 mt-3'>
                    <Button startIcon={<SettingsIcon />} variant="outlined" color="primary" onClick={handleSuggestQuery}>
                        Suggest Query
                    </Button>
                </div>
                <div className='columns-12 mt-3 mb-5'>
                    <Button type="submit" variant="outlined" color="secondary">
                        Submit Question
                    </Button>
                </div>
            </Box>
        <Navbar/>
    </Card>
    );
}
