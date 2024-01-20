import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function Navbar() {
    const [value, setValue] = useState(0);

    return (
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
    );
}

export default Navbar;