import { Tabs, Tab } from '@mui/material';

// @ts-ignore
const TabFilter = ({ value, onChange }) => {
    return (
        <Tabs
            sx={{
                width: '100%',
                '.MuiTab-root': {
                    padding: '6px 12px', // Reduce padding
                    fontSize: '0.875rem', // Reduce font size
                    '@media (max-width: 600px)': { // Adjust for smaller screens
                        padding: '3px 6px',
                        fontSize: '0.75rem',
                    }
                }
            }}
            value={value}
            onChange={onChange}
            variant="fullWidth" // Makes tabs take equal width
            scrollButtons="auto" // Hide scroll buttons when not needed
        >
            <Tab label="Age" />
            <Tab label="Gender" />
            <Tab label="Marital Status" />
        </Tabs>
    );
};

export default TabFilter;
