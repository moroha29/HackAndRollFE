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

interface Answer {
    user_id: string;
    option: string;
    age_range: string;
    gender: string;
    marital_status: string;
}

interface QuestionData {
    question: string;
    options: string[];
    answers: Answer[];
}


const ResultsPage = () => {
    const [data, setData] = useState<QuestionData | null>(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [selectedTab, setSelectedTab] = useState(0);

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

    const processDataForCharts = () => {
        if (!data) return { barData: [], pieData: [] };

        const demographicField = selectedTab === 0 ? 'age_range' : selectedTab === 1 ? 'gender' : 'marital_status';

        // Initialize groupedData with each option
        const groupedData = data.answers.reduce((acc, answer) => {
            const key = answer[demographicField];
            if (!acc[key]) {
                acc[key] = data.options.reduce((optAcc, opt) => {
                    optAcc[opt] = 0;
                    return optAcc;
                }, {});
            }
            acc[key][answer.option]++;
            return acc;
        }, {});

        const barData = Object.entries(groupedData).map(([key, value]) => ({
            name: key,
            ...value
        }));

        const pieData = data.options.map(option => ({
            name: option,
            value: barData.reduce((acc, cur) => acc + cur[option], 0)
        }));

        return { barData, pieData };
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    const { barData, pieData } = processDataForCharts();
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042']; // Extend this array for more options
    if (loading) {
        return (
            <Card sx={{ margin: '20px', padding: '20px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
            </Card>
        );
    }
    return (
        <Card sx={{ margin: '20px', padding: '20px' }}>
        <Box>
            <Typography variant="h4">{data?.question}</Typography>
            <Tabs variant="fullWidth" value={selectedTab} onChange={handleTabChange}>
                <Tab label="Age Range" />
                <Tab label="Gender" />
                <Tab label="Marital Status" />
            </Tabs>
            <ResponsiveContainer width="85%" height={300}>
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data?.options.map((option, index) => (
                        <Bar key={option} dataKey={option} fill={COLORS[index % COLORS.length]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
        </Card>
    );
};

export default ResultsPage;