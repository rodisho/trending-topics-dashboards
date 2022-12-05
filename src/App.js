import './App.css';
import {Chart} from "react-google-charts";
import React, { useState, useEffect } from 'react';
import GoogleData from './db/google_trends_formatted.json';
import TwitterData from './db/twitter_trends_formatted.json';
import VTData from './db/virus_total_results_formatted_embedded_ips.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainBody from './components/mainBody'
import {Container} from "@mui/material";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

//Need to bring in URL country from some sort of lookup (https://www.iplocation.net/ip-lookup)
//Then need to create a count statement, to count up the countries and populate them reoccuringly in the format below


//for (const num of arr) {
//    counts[num] = counts[num] ? counts[num] + 1 : 1;
//}

function preprocessData() {
    let trendingKeywordsGoogle = [];
    let trendingKeywordsTwitter = [];


    // Format Google Keywords and normalize data
    trendingKeywordsGoogle = [];
    let objSize = Object.keys(GoogleData).length;
    for(let i = 1; i < objSize; i++){
        for(let k = 1; k < GoogleData[i]['results'].length; k++) {
            let vtResults = [];
            let GoogleTerm = GoogleData[i]['results'][k];
            for(let j = 1; j < Object.keys(VTData).length; j++) {
                if(GoogleData[i]['_id'] === VTData[j]['origin']) {
                    for(const [key, value] of Object.entries(VTData[j]['results'])) {
                        if(key.includes(GoogleTerm['name'])){
                            if(value['suspicious'] > 0 || value['malicious'] > 0) {
                                vtResults.push(value);
                            }
                        }
                    }
                }
            }
            trendingKeywordsGoogle.push({'keyword': GoogleData[i]['results'][k]['name'], 'platform': 'Google', 'timestamp': GoogleData[i]['time'], 'malicious_urls': vtResults})
        }
    }
    // Format Twitter Keywords and normalize data
    objSize = Object.keys(TwitterData).length;
    for(let i = 1; i < objSize; i++){
        for(let k = 1; k < TwitterData[i]['results'].length; k++) {
            let vtResults = [];
            let GoogleTerm = TwitterData[i]['results'][k];
            for(let j = 1; j < Object.keys(VTData).length; j++) {
                if(TwitterData[i]['_id'] === VTData[j]['origin']) {
                    for(const [key, value] of Object.entries(VTData[j]['results'])) {
                        if(key.includes(GoogleTerm['name'])){
                            if(value['suspicious'] > 0 || value['malicious'] > 0) {
                                vtResults.push(value);
                            }
                        }
                    }
                }
            }
            trendingKeywordsTwitter.push({'keyword': TwitterData[i]['results'][k]['name'], 'platform': 'Twitter', 'timestamp': TwitterData[i]['time'], 'malicious_urls': vtResults})
        }
    }
    return [trendingKeywordsGoogle, trendingKeywordsTwitter];
}

function compileIpInfo() {
    const countryCodeLookup = {
        'US': 'United States',
        'AU': 'Australia',
        'CA': 'Canada',
        'DE': 'Germany',
        'FR': 'France',
        'GB': 'United Kingdom',
        'IE': 'Ireland',
        'IT': 'Italy',
        'JP': 'Japan',
        'NL': 'Netherlands',
        'PL': 'Poland',
        'SG': 'Singapore'
    };
    let countries = {};
    for(const [key, value] of Object.entries(VTData)){
        for(const [subkey, subvalue] of Object.entries(value['results'])) {
            if((subvalue['suspicious'] > 0 || subvalue['malicious'] > 0) && subvalue['country'] !== undefined) {
                if('"' + countryCodeLookup[subvalue['country']] + '"' in countries) {
                    countries['"' + countryCodeLookup[subvalue['country']] + '"'] = countries['"' + countryCodeLookup[subvalue['country']] + '"'] + 1;
                } else {
                    countries['"' + countryCodeLookup[subvalue['country']] + '"'] = 1;
                }
            }
        }
    }
    return countries;
}

function App() {
    let [googleTrendingKeywords, twitterTrendingKeywords] = preprocessData();
    let countries = compileIpInfo();
    let countrydata = [['Country', 'Malicious IP Hits']];
    for(const [key, value] of Object.entries(countries)) {
        countrydata.push([key, value])
    }
    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    Trending Topic Weaponization Dashboard
                </h3>
            </header>
            <div className="center">
                <Divider style={{paddingTop: "50px"}}>
                    <Chip label="GEOMAP" />
                </Divider>
                    <Chart
                        chartEvents={[
                            {
                                eventName: "select",
                                callback: ({ chartWrapper }) => {
                                    const chart = chartWrapper.getChart();
                                    const selection = chart.getSelection();
                                    if (selection.length === 0) return;
                                    const region = countrydata[selection[0].row + 1];
                                },
                            },
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="400px"
                        data={countrydata}
                        mapsApiKey="AIzaSyDAV8XexOIHjguK2nHxQv1ihqjZUtexhNk"
                    />
                </div>
                {/*<MainBody></MainBody>*/}
            {/*<div className={"App-body"}>*/}
            {/*    <Divider/>*/}
                <Divider style={{paddingTop: "100px"}}>
                    <Chip label="GOOGLE TRENDING TABLE" />
                </Divider>
                <Container style={{maxWidth: "80%", padding: "5px"}}>
                    <TableContainer component={Paper} sx={{
                        height: 700
                    }}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{backgroundColor: "#989fab"}}>Keyword</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Time</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Platform</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {googleTrendingKeywords.map((el, index) =>
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key={el.keyword} component="th" scope="row">
                                            {el.keyword}
                                        </TableCell>
                                        <TableCell align="right">{el.timestamp}</TableCell>
                                        <TableCell align="right">{el.platform}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Divider/>
                <Divider style={{paddingTop: "100px"}}>
                    <Chip label="TWITTER TRENDING TABLE" />
                </Divider>
                <Container style={{maxWidth: "80%", padding: "5px"}}>
                    <TableContainer component={Paper} sx={{
                        height: 700
                    }}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{backgroundColor: "#989fab"}}>Keyword</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Time</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Platform</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {twitterTrendingKeywords.map((el, index) =>
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key={el.keyword} component="th" scope="row">
                                            {el.keyword}
                                        </TableCell>
                                        <TableCell align="right">{el.timestamp}</TableCell>
                                        <TableCell align="right">{el.platform}</TableCell>


                                    </TableRow>
                                )}


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                {/*<Chart*/}
                {/*    chartType="Line"*/}
                {/*    width="100%"*/}
                {/*    height="400px"*/}
                {/*    data={data}*/}
                {/*    options={options}*/}
                {/*/>*/}
            {/*</div>*/}
            </div>
    );
}

export default App;
