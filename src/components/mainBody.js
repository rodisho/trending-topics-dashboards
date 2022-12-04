import React from 'react';
import  {Grid, Paper }   from '@mui/material';
import {red} from "@mui/material/colors";


const MainBody = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div class="time-picker-wrapper">
                            <label for='start'>Time Period Start:</label>
                            <input type="date" id="start" name="data-start" placeholder="2018-07-22" min="2018-01-01" max="2018-12-31"></input>
                        </div>
                        <div class="time-picker-wrapper">
                            <label for='end'>Time Period End:</label>
                            <input type="date" id="end" name="data-end" placeholder="2018-07-22" min="2018-01-01" max="2018-12-31"></input>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper sx={{
                        height: 400,
                        backgroundColor: '#9e5f2f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    </Paper>
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
