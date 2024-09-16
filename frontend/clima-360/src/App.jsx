import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";
import { BackgroundVideo } from "./components/BackgroundVideo";

function App() {
  return (
    <>
      <div className="App">
        <BackgroundVideo />
        <Header />
        <CurrentWeather />
        <Forecast />
      </div>
    </>
  );
}

export default App;
