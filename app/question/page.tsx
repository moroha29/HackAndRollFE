// Path/Filename: /pages/ResultsPage.tsx
"use client"
import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie, Cell
} from 'recharts';
import {Tabs, Tab, Box, Typography, Card, CircularProgress} from '@mui/material';
import {QuestionData} from "@/models/login";
import ResultsComponent from "@/components/ResultsComponent";
import CardDisplay from "@/components/CardDisplay";
import Navbar from "@/components/NavBar";



const ResultsPage = () => {
    const [data, setData] = useState<QuestionData | null>(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmission = (newData: QuestionData) => {
        setData(newData);
        setIsSubmitted(true);
    };
    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch('http://localhost:8000/questions/random/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const questionData: QuestionData = await response.json();
                setData(questionData);
                console.log(questionData)
            } catch (error) {
                console.error('Error fetching question data:', error);
                // Handle errors here, such as setting an error state
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionData();
    }, []);
    if (loading) {
        return (
            <Card sx={{ margin: '20px', padding: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            </Card>
        );
    }

    if (data !== null) {
        return (
            <div>
                <main className="flex bg-gradient-to-b from-pink-100 min-h-screen flex-col items-center justify-between">
                    <div className="z-10 items-center min-w-screen justify-between font-mono text-sm lg:flex">
            <Card className="m-5 p-5 bg-transparent shadow-none min-w-screen">
                {!isSubmitted && <CardDisplay questionData={data} handleSubmit={handleSubmission} />}
                {isSubmitted && <ResultsComponent data={data} />}
            </Card>
</div> </main>
                <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
                    <Navbar />
                </Box></div>

        );
    } else {

        return (
            <div>
            <Card className="bg-gradient-to-b from-pink-100"><h1>Ran out of questions</h1></Card>
                <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
                    <Navbar />
                </Box>
            </div>);

    }
};

export default ResultsPage;