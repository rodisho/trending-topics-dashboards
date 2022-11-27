import construction from './construction.png'
import './App.css';
import {Chart} from "react-google-charts";
import React, { useState, useEffect } from 'react';
import Data from './google-data.json'


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

    let timeStamp = []
    let finalResults = []
    let trendingKeywords = []


    useEffect(() => {
        let objSize = Object.keys(Data).length;
        for (let i = 1; i <= objSize; i++){
            console.log(" DATA of index", i ," " , Data[i].time)


            for(let k = 0; k < Data[i].results.length; k++){
            console.log(" trending name ", Data[i].results[k].name)
                trendingKeywords[k] = (Data[i].results[k].name);
            }
            timeStamp[i] = (Data[i].time);
            // timeStamp[i].push(trendingKeywords)
        }
        finalResults.push(trendingKeywords)
        // finalResults.push(timeStamp)
        console.log("THIS IS FINAL OBJECT " , timeStamp)
        console.log("THIS IS FINAL OBJECT " , finalResults)
    });


    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    Google Charts
                </h3>
            </header>
            <div className={"App-body"}>
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>

        </div>
    );
}

export default App;
