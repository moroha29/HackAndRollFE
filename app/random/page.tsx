"use client"
import React, { useState, useEffect } from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { QuestionData } from "@/models/login";
import ResultsComponent from "@/components/ResultsComponent";
import CardDisplay from "@/components/CardDisplay";
import Navbar from '@/components/NavBar';

const RandomQuestionPage = () => {
    const [question, setQuestion] = useState<QuestionData>();
    const [loading, setLoading] = useState(true);
    const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]); // Track submitted questions by their _id

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch('http://localhost:8000/questions/random/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const fetchedQuestion: QuestionData = await response.json();
                setQuestion(fetchedQuestion);
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
        setQuestion(newData);
    };
    

    if (loading) {
        return (
            <Card sx={{ margin: '20px', padding: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            </Card>
        );
    }
    if (question !== null) {
    return (
        <Box className="">
            <div className="content-center flex justify-center">
                <Card className="shadow-lg shadow-indigo-500/40 w-full xl:w-7/12"  sx={{ margin: '20px', padding: '20px'}}>
                    {!submittedQuestions.includes(question._id) && <CardDisplay questionData={question} handleSubmit={handleSubmission}/>}
                    {submittedQuestions.includes(question._id) && <ResultsComponent data={question} />}
                </Card>
            </div>
            <Navbar/>
        </Box>
    );}
    else{
        return(
        <div>
            <main className="flex bg-gradient-to-b from-pink-100 min-h-screen flex-col items-center justify-between">
                <div className="z-10 items-center min-w-screen justify-between font-mono text-sm lg:flex">
                    <Card className="bg-gradient-to-b from-pink-100"><h1>Ran out of questions</h1></Card>
                </div>
                
            </main>
            <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
                    <Navbar />
                </Box>
        </div>
        );
            
    }

}

export default RandomQuestionPage;