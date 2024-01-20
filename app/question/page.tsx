"use client"
import { useState, useEffect } from 'react';
import ChoiceList from '@/components/ChoiceList';
import { Container, Typography, Button } from '@mui/material';
import Box from "@mui/material/Box";

interface Choice {
  id: string;
  text: string;
}

interface QuestionData {
  id: string;
  questionText: string;
  choices: Choice[];
}

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const fetchQuestionData = async () => {
    // try {
    //   // Assuming JWT token is stored in localStorage or a similar place
    //   const token = localStorage.getItem('jwtToken');
    //   const response = await fetch('/api/question', {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //
    //   const data = await response.json();
    //   setQuestionData(data);
    // } catch (error) {
    //   console.error('Error fetching question data:', error);
    // }
    const response = {
      data: {
        id:"1",
        questionText: "Have you entered a hackathon before?",
        choices: [
          { id: "1", text: "Yes" },
          { id: "2", text: "No" },
          { id: "3", text: "Maybe" }
        ]
      }
    };

    setQuestionData(response.data);
  };useEffect(() => {
    fetchQuestionData();
  }, []);

  const handleChoiceSelect = (choiceIds: string[]) => {
    setSelectedChoices(choiceIds);
  };

  const handleSubmit = async () => {
    if (selectedChoices.length === 0) {
      alert('Please select at least one choice');
      return;
    }
    alert(selectedChoices)
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ questionId: questionData?.id, selectedChoices })
      });
      console.log(response)
      // Check for successful response and handle accordingly
    } catch (error) {
      console.error('Error submitting choices:', error);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box maxWidth="xs">
        <Typography variant="h4" gutterBottom>
          {questionData ? questionData.questionText : 'Loading question...'}
        </Typography>
        {questionData && (
            <>
              <ChoiceList choices={questionData.choices} onChoiceSelect={handleChoiceSelect} />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
        )}
        </Box>
      </Container>
  );
};

export default QuestionPage;
