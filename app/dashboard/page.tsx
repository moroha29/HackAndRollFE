// Path/Filename: /pages/ResultsPage.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { QuestionData } from "@/models/login";
import ResultsComponent from "@/components/ResultsComponent";
import CardDisplay from "@/components/CardDisplay";
import Navbar from '@/components/NavBar';
const ResultsPage = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]); // Track submitted questions by their _id

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch('http://localhost:8000/questions/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const fetchedQuestions: QuestionData[] = await response.json();
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleSubmission = (newData: QuestionData) => {
        setSubmittedQuestions(prev => [...prev, newData._id]);
    };

    if (loading) {
        return (
            <Card className="flex bg-gradient-to-b from-pink-100 min-h-screen flex-col items-center justify-between" >
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            </Card>
        );
    }

    if (questions.length === 0) {
        return (
                <main className="flex bg-gradient-to-b from-pink-100 min-h-screen flex-col items-center justify-between">
                    <div className="z-10 items-center min-w-screen justify-between font-mono text-sm lg:flex">
            
            <div className="bg-gradient-to-b from-pink-100 grid grid-cols-1 gap-1 xl:grid-cols-2">
        <Card sx={{ margin: '20px', padding: '20px' }}><Typography variant="h4">Ran out of questions</Typography></Card>
        </div>
        </div> </main>
        )
    }

    return (
        <Box    >
            <div className="bg-gradient-to-b from-pink-100 grid grid-cols-1 gap-1 xl:grid-cols-2">
            {questions.map(question => (
                <Card className="shadow-lg shadow-indigo-500/40" key={question._id} sx={{ margin: '20px', padding: '20px' }}>
                    {!submittedQuestions.includes(question._id) && <CardDisplay questionData={question} handleSubmit={() => handleSubmission(question)} />}
                    {submittedQuestions.includes(question._id) && <ResultsComponent data={question} />}
                </Card>
            ))}
            </div>
            <Navbar/>
        </Box>
    );
};

export default ResultsPage;
