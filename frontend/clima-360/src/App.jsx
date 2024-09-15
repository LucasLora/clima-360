import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <CurrentWeather />
        <Forecast />
      </div>
    </>
  );
}

export default App;
