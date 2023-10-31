import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchWeather = () => {

    const [inputText, setInputText] = useState('');
    const [city, setCity] = useState('Patna');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const API_key = process.env.REACT_APP_API_KEY;
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
                console.log(response.data);

                setWeatherData(response.data);

            } catch (error) {
                console.error(error);
            }
        }
        fetchAPI();
    }, [city]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(inputText);
    }

    let emoji = null;
    if (weatherData && weatherData.main) {
        const mainWeather = weatherData.weather[0].main;
        switch (mainWeather) {
            case "Clouds":
                emoji = "fa-cloud";
                break;
            case "Thunderstorm":
                emoji = "fa-bolt";
                break;
            case "Drizzle":
                emoji = "fa-cloud-rain";
                break;
            case "Rain":
                emoji = "fa-cloud-shower-heavy";
                break;
            case "Snow":
                emoji = "fa-cloud-snow-flake";
                break;
            default:
                emoji = "fa-smog";
                break;
        }
    } else {
        return (
            <div>...Loading</div>
        );
    }
    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    //Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            {weatherData && ( // Check if weatherData is not null
                                <img src={`https://source.unsplash.com/600x900/?${weatherData.weather[0].main}`} className="card-img" alt="..." />
                            )}
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input type="search" className="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2"
                                            onChange={(event) => { setInputText(event.target.value) }} value={inputText}
                                        />
                                        <button type="submit" className="input-group-text" id="basic-addon2" >
                                            <i className="fas fa-search" />
                                        </button>
                                    </div>
                                </form>
                                {weatherData && ( // Check if weatherData is not null
                                    <div className="bg-dark bg-opacity-50 py-3">
                                        <h5 className="card-title">{city}</h5>
                                        <p className="card-text lead">{day}, {month} {date}, {year}
                                            <br />
                                            {time}
                                        </p>
                                        <hr />
                                        <i className={`fas ${emoji} fa-4x`} />
                                        <h1 className="fw-border mb-3"> {weatherData.main.temp} &deg;C</h1>
                                        <p className="lead fw-bolder mb-8">{weatherData.weather[0].main}</p>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="colHeading"> Humidity</div>
                                                    <p>{weatherData.main.humidity}%</p>
                                                </div>
                                                <div className="col">
                                                    <div className="colHeading"> Visibility</div>
                                                    <p>{weatherData.visibility}</p>
                                                </div>
                                                <div className="col">
                                                    <div className="colHeading"> Wind</div>
                                                    <p>{weatherData.wind.speed}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchWeather;
