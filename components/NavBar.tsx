import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Link from '@mui/material/Link';

function Navbar() {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            value={value}
            showLabels
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >

            <Link href="question">
                <BottomNavigationAction label="Answer Qns" icon={<QuestionAnswerIcon />} />
            </Link>
            <Link href="generate">
                <BottomNavigationAction label="Generate Qns" icon={<AddCircleOutlineIcon />} />
            </Link>
            <Link href="">
                <BottomNavigationAction label="Like" icon={<ThumbUpIcon />} />
            </Link>
        </BottomNavigation>
    );
}

export default Navbar;