import construction from './construction.png'
import './App.css';
import {Chart} from "react-google-charts";
import MainBody from './components/mainBody'

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
            <MainBody></MainBody>

        </div>
    );
}

export default App;
