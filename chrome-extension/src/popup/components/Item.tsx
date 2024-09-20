import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface ItemProps {
    label: string;
    value: number | string
}

export const Item: React.FC<ItemProps> = ({ label, value}) => {
    return (
        <Grid container direction="row" justifyContent="space-around">
            <Grid>
                <Typography variant="h6" sx={{ fontWeight: "regular" }}>
                    {label}
                </Typography>
            </Grid>
            <Grid>
                <Typography variant="h6">{value}</Typography>
            </Grid>
        </Grid>
    );
};
