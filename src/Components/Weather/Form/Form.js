import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Form({ setInfo, setState, keyValue, setIsKeyTrue }) {
  const alertDOM = document.querySelector("#form-alert");
  const ALERT2 = `
    <div class="alert alert-danger" role="alert">
      This city does not exist in Turkey.
    </div>
  `;

  // keep the UI untill page refreshed and new tab opened
  const [localForm, setLocalForm] = useState([]);
  useEffect(() => {
    localStorage.setItem("Form", JSON.stringify(localForm));
  }, [localForm]);

  useEffect(() => {
    const savedForm = localStorage.getItem("Form");
    if (savedForm) {
      setLocalForm(JSON.parse(savedForm));
    }
  }, []);

  const [city, setCity] = useState("");

  async function formSubmit(e) {
    e.preventDefault();

    const apiKey = keyValue;
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},TR&appid=${apiKey}&units=metric`;
    await axios(baseURL)
      .then((res) => {
        setIsKeyTrue(true);
        setInfo(res.data);
        alertDOM.innerHTML = "";
      })
      .catch((error) => {
        alertDOM.innerHTML = ALERT2;
      });
    // prevent error while refreshing page
    setState(true);
  }

  return (
    <div className="form-container">
      <h1>Weather Condition</h1>
      <form id="form" onSubmit={formSubmit}>
        <div className="inputBox">
          <input
            placeholder="City Name"
            onChange={(e) => setCity(e.target.value)}
            type="text"
          />
          <button className="submit-btn">
            <BsSearch />
          </button>
        </div>
      </form>
      <div id="form-alert">{/* alert */}</div>
    </div>
  );
}

export default Form;
