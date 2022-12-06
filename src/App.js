import './App.css';
import {Chart} from "react-google-charts";
import React, { useState, useEffect } from 'react';
import GoogleData from './db/google_trends_formatted.json';
import TwitterData from './db/twitter_trends_formatted.json';
import VTData from './db/virus_total_results_formatted_embedded_ips.json';
import MetaData from './db/keywords_metadata.json';
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
import { isCompositeComponent } from 'react-dom/test-utils';

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
            var [keyword_in_content, keyword_in_metadata_description, keyword_in_outgoing_links] = ['False', 'False', 'False'];
            for(let j = 1; j < Object.keys(VTData).length; j++) {
                if(GoogleData[i]['_id'] === VTData[j]['origin']) {
                    for(const [key, value] of Object.entries(VTData[j]['results'])) {
                        if(key.includes(GoogleTerm['name'])){
                            if(value['suspicious'] > 0 || value['malicious'] > 0) {
                                vtResults.push(value);
                                Object.keys(MetaData).forEach(metadatakey => {
                                    if(metadatakey.includes(GoogleTerm['name'])) {
                                        if(MetaData[metadatakey]['in_page_source']) {
                                            keyword_in_content = 'True';
                                        } else if (MetaData[metadatakey]['in_metadata_description']) {
                                            keyword_in_metadata_description = 'True';
                                        } else if (MetaData[metadatakey]['in_outgoing_links']) {
                                            keyword_in_outgoing_links = 'True';
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
            trendingKeywordsGoogle.push({'keyword': GoogleData[i]['results'][k]['name'], 'platform': 'Google', 'timestamp': GoogleData[i]['time'], 'malicious_urls': vtResults, 'keyword_in_content': keyword_in_content, 'keyword_in_metadata_description': keyword_in_metadata_description, 'keyword_in_outgoing_links': keyword_in_outgoing_links});
        }
    }
    // Format Twitter Keywords and normalize data
    objSize = Object.keys(TwitterData).length;
    for(let i = 1; i < objSize; i++){
        for(let k = 1; k < TwitterData[i]['results'].length; k++) {
            var [keyword_in_content, keyword_in_metadata_description, keyword_in_outgoing_links] = ['False', 'False', 'False'];
            let vtResults = [];
            let GoogleTerm = TwitterData[i]['results'][k];
            for(let j = 1; j < Object.keys(VTData).length; j++) {
                if(TwitterData[i]['_id'] === VTData[j]['origin']) {
                    for(const [key, value] of Object.entries(VTData[j]['results'])) {
                        if(key.includes(GoogleTerm['name'])){
                            if(value['suspicious'] > 0 || value['malicious'] > 0) {
                                vtResults.push(value);
                                Object.keys(MetaData).forEach(metadatakey => {
                                    if(metadatakey.includes(GoogleTerm['name'])) {
                                        if(MetaData[metadatakey]['in_page_source']) {
                                            keyword_in_content = 'True';
                                        } else if (MetaData[metadatakey]['in_metadata_description']) {
                                            keyword_in_metadata_description = 'True';
                                        } else if (MetaData[metadatakey]['in_outgoing_links']) {
                                            keyword_in_outgoing_links = 'True';
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
            trendingKeywordsTwitter.push({'keyword': TwitterData[i]['results'][k]['name'], 'platform': 'Twitter', 'timestamp': TwitterData[i]['time'], 'malicious_urls': vtResults, 'keyword_in_content': keyword_in_content, 'keyword_in_metadata_description': keyword_in_metadata_description, 'keyword_in_outgoing_links': keyword_in_outgoing_links});
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

function compileMaliciousHitsByDay(formattedData){
    let timemap = {};
    let entries = [["Date", 'Malicious Hits', 'Google Hits', 'Twitter Hits']];
    formattedData.forEach(source => {
        source.forEach(keyword => {
            var day = keyword['timestamp'].split(" ")[0];
            if(keyword['malicious_urls'].length > 0) {
                if(day in timemap) {
                    if(keyword['platform'] == 'Twitter') {
                        timemap[day] = [timemap[day][0] + 1, timemap[day][1] + 1, timemap[day][2]];
                    } else {
                        timemap[day] = [timemap[day][0] + 1, timemap[day][1], timemap[day][2] + 1];
                    }
                } else {
                    if(keyword['platform'] == 'Twitter') {
                        timemap[day] = [1, 1, 0];
                    } else {
                        timemap[day] = [1, 0, 1];
                    } 
                }
            }
        });
    });
    Object.keys(timemap).forEach(key => {
        entries.push([key, timemap[key][0], timemap[key][1], timemap[key][2]])
    });
    return(entries);
}

function App() {
    let [googleTrendingKeywords, twitterTrendingKeywords] = preprocessData();
    let maliciousHitsByDay = compileMaliciousHitsByDay([googleTrendingKeywords, twitterTrendingKeywords]);
    let options = {
        title: "Malicious URL Hits Over Time",
        curveType: "function",
        legend: { position: "bottom" },
      };
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
                <Divider style={{paddingTop: "100px"}}>
                    <Chip label="MALICIOUS URLS OVER TIME" />
                </Divider>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={maliciousHitsByDay}
                    options={options}
                    />
            <div className={"App-body"} style={{paddingTop: "100px"}}>
                <Divider/>
                <Divider style={{paddingTop: "100px"}}>
                    <Chip label="GOOGLE TRENDING TABLE" />
                </Divider>
                <Container style={{maxWidth: "80%", padding: "5px"}}>
                    <TableContainer component={Paper} sx={{
                        height: 700
                    }}>
                        <Table sx={{ minWidth: 400}} aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Keyword</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Time</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">In Page Content?</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">In Metadata Description?</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">In Outgoing Links?</TableCell>
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
                                        <TableCell align="right">{el.keyword_in_content}</TableCell>
                                        <TableCell align="right">{el.keyword_in_metadata_description}</TableCell>
                                        <TableCell align="right">{el.keyword_in_outgoing_links}</TableCell>
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
                        <Table sx={{ minWidth: 400}} aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{backgroundColor: "#989fab"}}>Keyword</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Time</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">In Page Content?</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">Metadata Description?</TableCell>
                                    <TableCell style={{backgroundColor: "#989fab"}} align="right">In Outgoing Links?</TableCell>
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
                                        <TableCell align="right">{el.keyword_in_content}</TableCell>
                                        <TableCell align="right">{el.keyword_in_metadata_description}</TableCell>
                                        <TableCell align="right">{el.keyword_in_outgoing_links}</TableCell>
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
            </div>
    );
}

export default App;
