import "./CurrentWeather.css";

export default function CurrentWeather() {
  return (
    <>
      <div className="current-weather">
        <img src="sun.png" alt="Sol" width={163} />
        <p className="weather-status">Ensolarado</p>
        <span className="location-wrapper">
          <img
            src="position.png"
            alt="Local atual"
            className="position-icon"
            width={12}
          />
          <p className="location">Caxias do Sul</p>
        </span>

        <div className="temp-info">
          <div className="temp-range">
            <div className="temp-max">
              <span>28°C</span>
              <img src="up.png" alt="maxima" width={14} />
            </div>
            <div className="temp-min">
              <span>15°C</span>
              <img src="down.png" alt="minima" width={14} />
            </div>
          </div>

          <div className="temperature">
            <span>23</span>
          </div>
          <sup className="degrees-celsius-symbol">℃</sup>
        </div>

        <div className="weekday-date">
          <p>Domingo, 15 Set 2024</p>
        </div>
      </div>
    </>
  );
}
