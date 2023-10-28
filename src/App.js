import React, { useEffect, useState } from "react";
import axios from "axios";



function App() {

  const [inputText, setInputText] = useState('');
  const [city, setCity] = useState('Patna');
  const [temp, setTemp] = useState('');
  const [humid, setHumidity] = useState('');
  const [visible, setVisibility] = useState('');
  const [wind, setWindSpeed] = useState('');


  useEffect(() => {
    async function fetchAPI() {
      try {
        const API_key = process.env.REACT_APP_API_KEY;
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
        console.log(response.data);


        setTemp(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setVisibility(response.data.visibility);
        setWindSpeed(response.data.wind.speed);

      } catch (error) {
        console.error(error);
      }
    }
    fetchAPI();
  }, [city]);

  return (
    <>
      <input type="text" onChange={(event) => { setInputText(event.target.value) }} value={inputText} />
      <button onClick={() => { setCity(inputText); }}>Submit</button>

      <h2 style={{ textTransform: 'capitalize' }}> City: {city}</h2>
      <h2> Temperature: {temp} °C </h2>
      <h2>Humidity: {humid}</h2>
      <h2>Visibility: {visible}</h2>
      <h2>Wind Speed: {wind}</h2>

    </>
  );
}

export default App;
