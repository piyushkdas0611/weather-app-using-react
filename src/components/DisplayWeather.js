import React from "react";
import './DisplayWeather.css';

function DisplayWeather(props) {
  const message = "Not Found";
  const { data } = props;

  // Wrap the code that may cause an error in a try-catch block
  try {
    const iconurl =
      "http://openweathermap.org/img/wn/" +
      `${data.cod !== 404 ? data.weather[0].icon : null}` +
      ".png";
    const timeConvert = (unixTimestamp) => {
      // Create a Date object from the timestamp
      const date = new Date(unixTimestamp * 1000);

      // Convert to Eastern Time Zone
      const indianTime = date.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });

      return indianTime; // Output: "5/12/2023, 8:55:25 AM"
    };

    return (
      <div className="displayWeather">
        {data.cod !== 404 ? (
          <React.Fragment>
            <div className="main-card">
              <p className="card-title">
                {data.name}, {data.sys.country}
              </p>
              <p>
                Latitude: {data.coord.lat}
                <sup>o</sup> Longitude: {data.coord.lon}
                <sup>o</sup>
              </p>
              <h1>
                Feels Like: {Math.floor(data.main.temp - 273.15)}
                <sup>o</sup>C
              </h1>
              <p>
                {Math.floor(data.main.temp - 273.15)}
                <sup>o</sup>C / {Math.floor(data.main.temp - 273.15)}
                <sup>o</sup>C
              </p>
              <p className="weather-main">{data.weather[0].main}</p>
              <img src={iconurl} alt="" className="weather-icon" />
              <p>Sunrise: {timeConvert(data.sys.sunrise)}</p>
              <p>Sunset: {timeConvert(data.sys.sunset)}</p>
              <p>Humidity: {data.main.humidity}</p>
              <p>Pressure: {data.main.pressure}</p>
            </div>
          </React.Fragment>
        ) : (
          <div className="main-card">
            <h2>{message}</h2>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in DisplayWeather component: ", error);
    return (
      <div className="main-card">
        <h2>An error occurred while rendering this component.</h2>
      </div>
    );
  }
}

export default DisplayWeather;