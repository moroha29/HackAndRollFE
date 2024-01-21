import { useState } from 'react';
import ChoiceList from '@/components/ChoiceList';
import { Typography, Button } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {QuestionData} from "@/models/login";

interface CardDisplayProps {
  questionData: QuestionData;
  handleSubmit: (question: QuestionData) => QuestionData;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ questionData, handleSubmit }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (selectedOption: string) => {
        setSelectedOption(selectedOption);
    };
    const submitChoice = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch('http://localhost:8000/questions/answer/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
                    },
                    body: JSON.stringify({
                        question_id: questionData._id,
                        option: selectedOption
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            const responseData = await response.json();
            handleSubmit({...responseData,answers:[...responseData.answers]}); // Pass the response data to the parent component
        } catch (error) {
            console.error('Error submitting choice:', error);
        }
    };
    const handleClick = () => {
        if (selectedOption) {
            submitChoice();
        }
    };

  return (
      <Card style={{ marginBottom: '22px', boxShadow:'0px' }}>
        <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={questionData.question}
        />
        <CardContent>
            <ChoiceList
                choices={questionData.options.map(option => ({ id: option, text: option }))}
                onChoiceSelect={handleOptionChange}
                selectedChoice={selectedOption}
            />
        </CardContent>
          <CardActions disableSpacing>
              <Button
                  color="secondary"
                  variant='outlined'
                  onClick={handleClick}
                  disabled={!selectedOption}
              >
                  Submit
              </Button>
              <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                  <ShareIcon />
              </IconButton>
          </CardActions>
      </Card>
  );
};

export default CardDisplay;