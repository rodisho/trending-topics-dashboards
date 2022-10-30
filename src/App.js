import construction from './construction.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={construction} className="App-logo" alt="logo" />
        <p>
          Under Construction. Work in progress...!
        </p>
        <a
          className="App-link"
          href="https://www.chartjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn ChartJs
        </a>
      </header>
    </div>
  );
}

export default App;
