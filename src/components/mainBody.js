import React from 'react';
import  {Grid, Paper }   from '@mui/material';
import {red} from "@mui/material/colors";

const MainBody = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 500,
                        backgroundColor: '#cb7a3c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>1 ITEM</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 400,
                        backgroundColor: '#9e5f2f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>2 ITEM</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 300,
                        backgroundColor: '#714422',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>3 ITEM</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 200,
                        backgroundColor: '#2d1b0d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>4 ITEM</Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default MainBody;
