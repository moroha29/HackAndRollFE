"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
        >
          <BottomNavigationAction label="Answer Qns" icon={<QuestionAnswerIcon />} />
          <BottomNavigationAction label="Generate Qns" icon={<AddCircleOutlineIcon />} />
          <BottomNavigationAction label="Like" icon={<ThumbUpIcon />} />
        </BottomNavigation>
      </Box>
  );
}