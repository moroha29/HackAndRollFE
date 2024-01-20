"use client"

import { useState, useEffect } from 'react';
//import axios from 'axios';
import ChoiceList from "@/components/ChoiceList";
import { Container, Typography } from '@mui/material';

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

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        // const response = await axios.get<QuestionData>('/api/question'); // Update the URL as needed
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
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, []);

  return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          {questionData ? questionData.questionText : 'Loading question...'}
        </Typography>
        {questionData && <ChoiceList choices={questionData.choices} />}
      </Container>
  );
};

export default QuestionPage;