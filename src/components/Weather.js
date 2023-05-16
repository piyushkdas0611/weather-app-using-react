import React, { useState } from "react";
import DisplayWeather from './DisplayWeather';
import "./Weather.css";

function Weather() {
  const API = "425c4c6f61741ecd3a2ea6035d37180c";

  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [weather, setWeather] = useState({});

  async function getWeather(e) {
    e.preventDefault();

    if (form.city === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.state},${form.country}&appid=${API}`
      )
        .then((res) => res.json())
        .then((data) => (data));
        console.log(data);
        setWeather(data);
    }
  }

  const handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
    console.log(form.city + " " + form.country);
  };
  return (
    <div className="weather">
      <div className="main">
        <h1 className="header">WEATHER APPLICATION</h1>
        <form action="">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={(e) => handlechange(e)}
          />
          <button className="getWeather" onClick={(e) => getWeather(e)}>
            Submit
          </button>
        </form>
      </div>  
      <div>
        {Object.keys(weather).length !== 0 ? (
          <DisplayWeather data={weather} />
        ) : null}
      </div>
      <div className="footer">Coded by Piyush J. Das</div>
    </div>
  );
}

export default Weather;
