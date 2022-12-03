import construction from './construction.png'
import './App.css';
import {Chart} from "react-google-charts";


const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
    ["2018", 1033, 570, 400],
];

const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};


function App() {
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
