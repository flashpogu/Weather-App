import { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/app?q=${input}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <input type="submit" />
      </form>
      {weatherData && (
        <div>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
