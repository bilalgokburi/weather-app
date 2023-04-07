import { useState } from "react";

// components
import Form from "./Form/Form";
import Info from "./Info/Info";
import Landing from "./Landing/Landing";

import {} from "./style.css";

// context
import { WeatherProvider } from "../../context/WeatherContext";

function Weather() {
  const [isKeyTrue, setIsKeyTrue] = useState(false);
  const [keyValue, setkeyValue] = useState("");
  const [state, setState] = useState(false);
  const [weather, setWeather] = useState(false);

  return (
    <WeatherProvider>
      {weather ? (
        <>
          <Form
            keyValue={keyValue} 
            setState={setState}
            setIsKeyTrue={setIsKeyTrue}
          />
          {isKeyTrue && <Info state={state} />}
        </>
      ) : (
        <Landing
          weather={weather}
          setWeather={setWeather}
          keyValue={keyValue}
          setkeyValue={setkeyValue}
        />
      )}
    </WeatherProvider>
  );
}

export default Weather;
