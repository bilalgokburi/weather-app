import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


function Landing({ setkeyValue, keyValue, setWeather }) {
  let apiKey = "";
  const alertDOM = document.querySelector("#landing-alert");
  const ALERT = `
    <div class="alert alert-danger" role="alert">
    Please enter a valid API key!
    </div>
  `;

  async function checkKey(e) {
    e.preventDefault();
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=Turkey&appid=${keyValue}&units=metric&lang=tr`;
    await axios(baseURL)
      .then((res) => {
        if (res.status == 200) {
          apiKey = keyValue;
          setWeather(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          setWeather(false);
          alertDOM.innerHTML = ALERT;
        }
      });
  }

  useEffect(
    (e) => {
      if (keyValue !== apiKey) {
        setWeather(false);
      }
    },
    [keyValue]
  );


  return (
    <>
    <div className="landing-container">
        <form onSubmit={checkKey}>
          <p>Please enter an api key.</p>
          <input
            value={keyValue}
            placeholder="Enter Api Key"
            onChange={(e) => setkeyValue(e.target.value)}
          />
        </form>
      </div>
      <div id="landing-alert">{/* alert */}</div>
    </>
  );
}

export default Landing;
