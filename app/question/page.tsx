"use client"
import { useState, useEffect } from 'react';
import ChoiceList from '@/components/ChoiceList';
import { Container, Typography, Button } from '@mui/material';
import Box from "@mui/material/Box";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import CardDisplay from '@/components/CardDisplay';
import QuestionData from '@/components/QuestionData';
// interface Choice {
//   id: string;
//   text: string;
// }

// interface QuestionData {
//   id: string;
//   questionText: string;
//   choices: Choice[];
// }

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
    //setIsClicked(true)
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

  // code added for card
  // interface ExpandMoreProps extends IconButtonProps {
  //   expand: boolean;
  // }

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // const ExpandMore = styled((props: ExpandMoreProps) => {
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // })(({ theme, expand }) => ({
  //   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // }));

  //const [isClicked, setIsClicked] = useState(false);

  return (
      //<Container maxWidth="sm">
      //  <Box maxWidth="xs">
      //  <Typography variant="h4" gutterBottom>
      //    {questionData ? questionData.questionText : 'Loading question...'}
      //  </Typography>
      //  {questionData && (
      //      <>
      //        <ChoiceList choices={questionData.choices} onChoiceSelect={handleChoiceSelect} />
      //        <Button variant="contained" color="primary" onClick={handleSubmit}>
      //          Submit
      //        </Button>
      //      </>
      //  )}
      //  </Box>
      //</Container>
    
    <CardDisplay questionData = {questionData} handleChoiceSelect={ handleChoiceSelect} handleSubmit={handleSubmit} />

    //   <Card >
    //     <CardHeader
    //       action={
    //         <IconButton aria-label="settings">
    //           <MoreVertIcon />
    //         </IconButton>
    //       }
    //       title="Example 1"
    //       subheader="Jan 20, 2024"
    //     />
    //     <CardContent>
    //       <Typography variant="body2" color="text.secondary">
    //         {questionData ? questionData.questionText : 'Loading question...'}
    //       </Typography>
          
    //       {questionData && (
    //           <>
    //             <ChoiceList choices={questionData.choices} onChoiceSelect={handleChoiceSelect} />
                
    //             <Button color="primary" disabled = {isClicked} onClick={handleSubmit}>
    //               Submit
    //             </Button>
    //           </>
    //       )}

    //     </CardContent>
    //     <CardActions disableSpacing>
    //       <IconButton aria-label="add to favorites">
    //         <FavoriteIcon />
    //       </IconButton>
    //       <IconButton aria-label="share">
    //         <ShareIcon />
    //       </IconButton>
    //       <ExpandMore
    //         expand={isClicked}
    //         onClick={handleExpandClick}
    //         aria-expanded={expanded}
    //         aria-label="show more"
    //       >
    //         <ExpandMoreIcon />
    //       </ExpandMore>
    //     </CardActions>
    //     <Collapse in={isClicked} timeout="auto" unmountOnExit>
    //       <CardContent>
    //         <Typography paragraph>Method:</Typography>
    //         <Typography paragraph>
    //           Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
    //           aside for 10 minutes.
    //         </Typography>
    //         <Typography paragraph>
    //           Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
    //           medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
    //           occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
    //           large plate and set aside, leaving chicken and chorizo in the pan. Add
    //           pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
    //           stirring often until thickened and fragrant, about 10 minutes. Add
    //           saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    //         </Typography>
    //         <Typography paragraph>
    //           Add rice and stir very gently to distribute. Top with artichokes and
    //           peppers, and cook without stirring, until most of the liquid is absorbed,
    //           15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
    //           mussels, tucking them down into the rice, and cook again without
    //           stirring, until mussels have opened and rice is just tender, 5 to 7
    //           minutes more. (Discard any mussels that don&apos;t open.)
    //         </Typography>
    //         <Typography>
    //           Set aside off of the heat to let rest for 10 minutes, and then serve.
    //         </Typography>
    //       </CardContent>
    //     </Collapse>
    // </Card>

  );
};

export default QuestionPage;
