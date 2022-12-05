import React from 'react';
import GoogleData from '../db/google_trends_formatted.json';
import TwitterData from '../db/twitter_trends_formatted.json';
import VTData from '../db/virus_total_results_formatted_embedded_ips.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Chart} from "react-google-charts";
import { useState, useEffect } from 'react';





function GeoMapChart() {
    const [countries, setCountries] = useState("")
    const [trendingKeys, setTrendingKeys] = useState("")

    const  preprocessData= () =>{
        let trendingKeywords = [];


        // Format Google Keywords and normalize data
        trendingKeywords = [];
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
                trendingKeywords.push({'keyword': GoogleData[i]['results'][k]['name'], 'platform': 'Google', 'timestamp': GoogleData[i]['time'], 'malicious_urls': vtResults})
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
                trendingKeywords.push({'keyword': TwitterData[i]['results'][k]['name'], 'platform': 'Google', 'timestamp': TwitterData[i]['time'], 'malicious_urls': vtResults})
            }
        }

        return trendingKeywords;
    }

    const compileIpInfo= ()=> {
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
        let localCountries = {};
        for(const [key, value] of Object.entries(VTData)){
            for(const [subkey, subvalue] of Object.entries(value['results'])) {
                if((subvalue['suspicious'] > 0 || subvalue['malicious'] > 0) && subvalue['country'] !== undefined) {
                    if('"' + countryCodeLookup[subvalue['country']] + '"' in localCountries) {
                        localCountries['"' + countryCodeLookup[subvalue['country']] + '"'] = localCountries['"' + countryCodeLookup[subvalue['country']] + '"'] + 1;
                    } else {
                        localCountries['"' + countryCodeLookup[subvalue['country']] + '"'] = 1;
                    }
                }
            }
        }
        setCountries(localCountries)
        // return localCountries;
    }

    let countrydata = [['Country', 'Malicious IP Hits']];
    for(const [key, value] of Object.entries(countries)) {
        countrydata.push([key, value])
    }

    useEffect(()=>{
        compileIpInfo();
        preprocessData();
    })

    return (
        <div>
            <div className="center">
                <Chart
                    chartEvents={[
                        {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                                const chart = chartWrapper.getChart();
                                const selection = chart.getSelection();
                                if (selection.length === 0) return;
                                const region = countrydata[selection[0].row + 1];
                                console.log("Selected : " + region);
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
        </div>
    );
}

export default GeoMapChart;
