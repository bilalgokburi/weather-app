import { useState, useEffect } from "react";
import Form from "./Form/Form";
import Info from "./Info/Info";
import Landing from "./Landing/Landing";
import {} from "./style.css";

function Weather() {
  const [isKeyTrue, setIsKeyTrue] = useState(false);
  const [keyValue, setkeyValue] = useState("");
  const [info, setInfo] = useState([]);
  const [state, setState] = useState(false);
  const [weather, setWeather] = useState(false);

  // keep te UI untill page refreshed and new tab opened

  useEffect(() => {
    const savedWeather = JSON.parse(localStorage.getItem("weather"));
    if (savedWeather) {
      setkeyValue(savedWeather.keyValue);
      setInfo(savedWeather.info);
      setState(savedWeather.state);
      setWeather(savedWeather.weather);
      setIsKeyTrue(savedWeather.isKeyTrue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "weather",
      JSON.stringify({
        keyValue,
        info,
        state,
        weather,
        isKeyTrue,
      })
    );
  }, [keyValue, info, state, weather, isKeyTrue]);

  return (
    <div>
      {weather ? (
        <>
          <Form
            keyValue={keyValue}
            setInfo={setInfo}
            setState={setState}
            setIsKeyTrue={setIsKeyTrue}
          />
          {isKeyTrue && <Info info={info} state={state} />}
        </>
      ) : (
        <Landing
          weather={weather}
          setWeather={setWeather}
          keyValue={keyValue}
          setkeyValue={setkeyValue}
        />
      )}
    </div>
  );
}

export default Weather;
