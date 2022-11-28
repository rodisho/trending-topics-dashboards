import './App.css';
import {Chart} from "react-google-charts";
import React from "react";

//Need to bring in URL country from some sort of lookup (https://www.iplocation.net/ip-lookup)
//Then need to create a count statement, to count up the countries and populate them reoccuringly in the format below

//count the countries and append
//const arr = [US, JP, NL, IT, CA, GB, CH, DE, SI, IE];
//const counts = {};

//for (const num of arr) {
//    counts[num] = counts[num] ? counts[num] + 1 : 1;
//}

//console.log(counts);
//console.log(counts[US], counts[JP], counts[NL], counts[IT],  counts[CA], counts[GB], counts[CH], counts[DE], counts[SI], counts[IE],);

export const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
];

export function App() {
    return (
        <Chart
            chartEvents={[
                {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const region = data[selection[0].row + 1];
                        console.log("Selected : " + region);
                    },
                },
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
        />
    );
}

export default App;
