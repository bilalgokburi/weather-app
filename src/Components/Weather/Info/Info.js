import { useState, useEffect } from "react";
import { WiHumidity } from "react-icons/wi";
import { HiLocationMarker } from "react-icons/hi";
import { MdThermostat } from "react-icons/md";

function Info({ info, state }) {
  // keep the UI untill page refreshed and new tab opened
  const [localInfo, setLocalInfo] = useState([]);

  useEffect(() => {
    localStorage.setItem("Info", JSON.stringify(localInfo));
  }, [localInfo]);

  useEffect(() => {
    const savedInfo = localStorage.getItem("Info");
    if (savedInfo) {
      setLocalInfo(JSON.parse(savedInfo));
    }
  }, []);

  return state ? (
    <div className="info-container">
      <div className="temp-icon">
        <img
          src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
        ></img>
      </div>
      <p id="temperature">{Math.round(info.main.temp)} °C</p>
      <p className="weather">{info.weather[0].description} </p>
      <p className="city">
        <HiLocationMarker color="#43AFFC" /> {info.name}, {info.sys.country}
      </p>
      <div className="feel">
        <div className="bracket">
          <p className="feels-like">
            <MdThermostat color="#43AFFC" /> {info.main.feels_like} °C
          </p>
        </div>
        <div>
          <p className="humidity">
            <WiHumidity color="#43AFFC" /> {info.main.humidity}%
          </p>
        </div>
      </div>
    </div>
  ) : null; // prevent error while refreshing page
}

export default Info;
