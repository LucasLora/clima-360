import "./Forecast.css";

export default function Forecast() {
  return (
    <div className="forecast-container">
      <p>Próximos 5 dias</p>

      <div className="row">
        <img src="logo.png" alt="chuva" className="weather-icon" />
        <span className="day">Seg. Chuva</span>
        <div className="temperature-details">
          <img src="down.png" alt="minima" className="arrow-img" />
          <span>28<span className="degree-symbol">°C</span></span>
          <img src="up.png" alt="maxima" className="arrow-img" />
          <span>30<span className="degree-symbol">°C</span></span>
        </div>
      </div>

      <div className="row">
        <img src="logo.png" alt="sol" className="weather-icon" />
        <span className="day">Ter. Sol</span>
        <div className="temperature-details">
          <img src="down.png" alt="minima" className="arrow-img" />
          <span>30<span className="degree-symbol">°C</span></span>
          <img src="up.png" alt="maxima" className="arrow-img" />
          <span>32<span className="degree-symbol">°C</span></span>
        </div>
      </div>

      <div className="row">
        <img src="logo.png" alt="nublado" className="weather-icon" />
        <span className="day">Qua. Nublado</span>
        <div className="temperature-details">
          <img src="down.png" alt="minima" className="arrow-img" />
          <span>22<span className="degree-symbol">°C</span></span>
          <img src="up.png" alt="maxima" className="arrow-img" />
          <span>26<span className="degree-symbol">°C</span></span>
        </div>
      </div>

      <div className="row">
        <img src="logo.png" alt="tempestade" className="weather-icon" />
        <span className="day">Qui. Tempestade</span>
        <div className="temperature-details">
          <img src="down.png" alt="minima" className="arrow-img" />
          <span>17<span className="degree-symbol">°C</span></span>
          <img src="up.png" alt="maxima" className="arrow-img" />
          <span>20<span className="degree-symbol">°C</span></span>
        </div>
      </div>

      <div className="row">
        <img src="logo.png" alt="neve" className="weather-icon" />
        <span className="day">Sex. Neve</span>
        <div className="temperature-details">
          <img src="down.png" alt="minima" className="arrow-img" />
          <span>10<span className="degree-symbol">°C</span></span>
          <img src="up.png" alt="maxima" className="arrow-img" />
          <span>12<span className="degree-symbol">°C</span></span>
        </div>
      </div>
    </div>
  );
}
