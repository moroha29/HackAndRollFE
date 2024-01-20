// Path/Filename: /components/ResultsComponent.tsx
"use client"
import React from 'react';
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
    Pie,
    Cell
} from 'recharts';
import {
    Tabs,
    Tab,
    Box,
    Typography,
    Card,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';
import {QuestionData} from "@/models/login";
import TextField from "@mui/material/TextField";

interface ResultsComponentProps {
    data: QuestionData;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ data }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [isCommentDrawerOpen, setCommentDrawerOpen] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [comments, setComments] = React.useState(data?.comments || []);

    const toggleCommentDrawer = () => {
        setCommentDrawerOpen(!isCommentDrawerOpen);
    };

    const addComment = async () => {
        if (newComment.trim() === '') return;

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('http://localhost:8000/questions/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                },
                body: JSON.stringify({
                    question_id: data._id, // Assuming data._id contains the question ID
                    comment: newComment
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // If the backend returns the updated question data including the new comments
            const updatedQuestionData = await response.json();

            // Assume updatedQuestionData.comments is an array of comment objects
            setComments(updatedQuestionData.comments); // Update comments with the new list including the added comment
            setNewComment(''); // Reset the input field

        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const processDataForCharts = () => {
        const demographicField = selectedTab === 0 ? 'age_range' : selectedTab === 1 ? 'gender' : 'marital_status';

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

    return (
        <Card sx={{ margin: '0px', padding: '0px',boxShadow:'0' }}>
            <Box>
                <Typography variant="h5">{data?.question}</Typography>
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
                <IconButton onClick={toggleCommentDrawer}>Toggle Comments</IconButton>
                {/* Comment Drawer */}
                <Drawer anchor="bottom" open={isCommentDrawerOpen} onClose={toggleCommentDrawer}>
                    <List>
                        {comments.map((commentObj, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={commentObj.comment} secondary={`Age: ${commentObj.age_range}, Gender: ${commentObj.gender}, Status: ${commentObj.marital_status}`} />
                            </ListItem>
                        ))}
                    </List>
                    {/* Add comment input and submit button */}
                    <TextField
                        label="Type Comment"
                        variant="outlined"
                        fullWidth
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button variant="outlined" color="primary" onClick={addComment}>
                        Add Comment
                    </Button>
                </Drawer>
            </Box>
        </Card>
    );
};

export default ResultsComponent;
