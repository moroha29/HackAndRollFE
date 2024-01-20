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
        // Fetch data from backend. Simulate with hardcoded data for now
        const fetchedData: QuestionData = {
                "question": "are you lee zhi xuan",
                "options": ["no", "yes", "maybe"],
                "answers": [
                    {
                        "user_id": "jawjvjakvjak",
                        "option": "yes",
                        "age_range": "<18",
                        "gender": "male",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "girl12",
                        "option": "no",
                        "age_range": "<18",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user3",
                        "option": "maybe",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user4",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user5",
                        "option": "yes",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user6",
                        "option": "maybe",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user7",
                        "option": "yes",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user8",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user9",
                        "option": "maybe",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user10",
                        "option": "yes",
                        "age_range": ">45",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user11",
                        "option": "maybe",
                        "age_range": "<18",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user12",
                        "option": "yes",
                        "age_range": "<18",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user13",
                        "option": "no",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user14",
                        "option": "yes",
                        "age_range": "18-25",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user15",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user16",
                        "option": "maybe",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user17",
                        "option": "yes",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user18",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user19",
                        "option": "maybe",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user20",
                        "option": "yes",
                        "age_range": ">45",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user21",
                        "option": "maybe",
                        "age_range": "<18",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user22",
                        "option": "yes",
                        "age_range": "<18",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user23",
                        "option": "no",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user24",
                        "option": "yes",
                        "age_range": "18-25",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user25",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user26",
                        "option": "maybe",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user27",
                        "option": "yes",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user28",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user29",
                        "option": "maybe",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user30",
                        "option": "yes",
                        "age_range": ">45",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user31",
                        "option": "maybe",
                        "age_range": "<18",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user32",
                        "option": "yes",
                        "age_range": "<18",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user33",
                        "option": "no",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user34",
                        "option": "yes",
                        "age_range": "18-25",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user35",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user36",
                        "option": "maybe",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user37",
                        "option": "yes",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user38",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user39",
                        "option": "maybe",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user40",
                        "option": "yes",
                        "age_range": ">45",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user41",
                        "option": "maybe",
                        "age_range": "<18",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user42",
                        "option": "yes",
                        "age_range": "<18",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user43",
                        "option": "no",
                        "age_range": "18-25",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user44",
                        "option": "yes",
                        "age_range": "18-25",
                        "gender": "female",
                        "marital_status": "attached"
                    },
                    {
                        "user_id": "user45",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user46",
                        "option": "maybe",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user47",
                        "option": "yes",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "married"
                    },
                    {
                        "user_id": "user48",
                        "option": "no",
                        "age_range": "26-35",
                        "gender": "female",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user49",
                        "option": "maybe",
                        "age_range": "36-45",
                        "gender": "male",
                        "marital_status": "single"
                    },
                    {
                        "user_id": "user50",
                        "option": "yes",
                        "age_range": ">45",
                        "gender": "female",
                        "marital_status": "attached"
                    }
                ]
            }
        ;
        setLoading(false);
        setData(fetchedData);
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