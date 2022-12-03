import construction from './construction.png'
import './App.css';
import {Chart} from "react-google-charts";
import React, { useState, useEffect } from 'react';
import GoogleData from './db/google_trends_formatted.json'
import TwitterData from './db/twitter_trends_formatted.json'
import VTData from './db/virus_total_results_formatted.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainBody from './components/mainBody'



const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};

function App() {

    let trendingKeywords = [];

    useEffect(() => {
        let objSize = Object.keys(GoogleData).length;
        for (let i = 1; i <= objSize; i++){
            let tempResult = [];
            for(let k = 0; k < Data[i].results.length; k++){
                tempResult.push(Data[i].results[k].name);
            }
            formatedKeywords[Data[i]._id] = tempResult
            formatedKeywords[Data[i]._id].push(Data[i].time)

        }
        console.log(" ***** ", formatedKeywords);
        console.log(" ***** ", typeof(formatedKeywords));
        formatedKeywords.splice(1,formatedKeywords.length-1)
        console.log(" ===> ", formatedKeywords);

        // const arr = Array.from(formatedKeywords);
        //
        // console.log(" #### ", arr)
    });


    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    Google Charts
                </h3>
            </header>
            <div className={"App-body"}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                formatedKeywords.map((formatedKeyword) => (
                                <TableRow
                                    key={formatedKeyword.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell key={formatedKeyword.name} component="th" scope="row">
                                        {formatedKeyword.name}
                                    </TableCell>
                                    <TableCell align="right">RAFI</TableCell>
                                    <TableCell align="right">RAFI</TableCell>
                                </TableRow>
                            ))

                            }
                        </TableBody>
                    </Table>
                </TableContainer>





                {/*<Chart*/}
                {/*    chartType="Line"*/}
                {/*    width="100%"*/}
                {/*    height="400px"*/}
                {/*    data={data}*/}
                {/*    options={options}*/}
                {/*/>*/}
            </div>
            <MainBody></MainBody>

        </div>
    );
}

export default App;
