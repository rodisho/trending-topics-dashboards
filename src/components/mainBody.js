import React from 'react';
import  {Grid, Paper }   from '@mui/material';
import {red} from "@mui/material/colors";

//Custom slider logic
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}
    
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);


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
                    }}>
                        <div class="range_container">
                            <div class="sliders_control">
                                <input id="fromSlider" type="range" value="10" min="0" max="100"/>
                                <input id="toSlider" type="range" value="40" min="0" max="100"/>
                            </div>
                            <div class="form_control">
                                <div class="form_control_container">
                                    <div class="form_control_container__time">Min</div>
                                    <input class="form_control_container__time__input" type="number" id="fromInput" value="10" min="0" max="100"/>
                                </div>
                                <div class="form_control_container">
                                    <div class="form_control_container__time">Max</div>
                                    <input class="form_control_container__time__input" type="number" id="toInput" value="40" min="0" max="100"/>
                                </div>
                            </div>
                        </div>
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
