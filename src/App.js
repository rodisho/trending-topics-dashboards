import construction from './construction.png'
import './App.css';
import {Chart} from "react-google-charts";
import React, { useState, useEffect } from 'react';
import Data from './google-data.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};

function App() {

    let tempResult = []
    let timeStamp = []
    let finalResults = []
    let trendingKeywords = [[]]

    let formatedKeywords =[{}]



    useEffect(() => {
        let objSize = Object.keys(Data).length;
        for (let i = 1; i <= objSize; i++){
            let tempResult = [];
            for(let k = 0; k < Data[i].results.length; k++){
                console.log(" trending name ", Data[i].results[k].name)
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

        </div>
    );
}

export default App;
