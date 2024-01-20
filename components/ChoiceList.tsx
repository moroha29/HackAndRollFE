// Path/Filename: /components/ChoiceList.tsx
// Purpose: Update the ChoiceList component to render choices as selectable checkboxes.

import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Choice {
    id: string;
    text: string;
}

interface ChoiceListProps {
    choices: Choice[];
    onChoiceSelect: (selectedChoiceIds: string[]) => void;
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChoiceSelect }) => {
    const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

    const handleChoiceSelect = (event: React.ChangeEvent<HTMLInputElement>, choiceId: string) => {
        const newSelectedChoices = event.target.checked
            ? [...selectedChoices, choiceId]
            : selectedChoices.filter(id => id !== choiceId);

        setSelectedChoices(newSelectedChoices);
        onChoiceSelect(newSelectedChoices);
    };

    return (
        <FormGroup>
            {choices.map((choice) => (

                <FormControlLabel className='text-base'
                    key={choice.id}
                    control={
                        <Checkbox
                            checked={selectedChoices.includes(choice.id)}
                            onChange={(event) => handleChoiceSelect(event, choice.id)}
                        />
                    }
                    label={choice.text}
                />
            ))}
        </FormGroup>
    );
};

export default ChoiceList;
