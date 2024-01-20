// Path/Filename: /components/ChoiceList.tsx
// Purpose: Create a TypeScript component to render a list of multiple choice options.

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Choice {
    id: string;
    text: string;
}

interface ChoiceListProps {
    choices: Choice[];
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices }) => {
    return (
        <List>
            {choices.map((choice) => (
                <ListItem key={choice.id}>
                    <ListItemText primary={choice.text} />
                </ListItem>
            ))}
        </List>
    );
};

export default ChoiceList;
