import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Link from '@mui/material/Link';

function Navbar() {
    const [value, setValue] = useState(0);
    return (
        <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
        <BottomNavigation
            value={value}
            showLabels
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Answer Qns" icon={<QuestionAnswerIcon />} href="/dashboard" />
            <BottomNavigationAction label="Generate Qns" icon={<AddCircleOutlineIcon />} href="/generate"/>
            <BottomNavigationAction label="Like" icon={<ThumbUpIcon />} />
        </BottomNavigation>
        </Box>
    );
}

export default Navbar;