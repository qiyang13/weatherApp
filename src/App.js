
import './App.css';
import Header from './components/layout/Header';
import WeatherResults from './components/weather/WeatherResults';
import { WeatherProvider } from './context/weather/WeatherContext';
import WeatherSearch from './components/weather/WeatherSearch';
import WeatherSearchHistoryList from './components/weather/WeatherSearchHistoryList';

function App() {
  return (
    <WeatherProvider>
      <div className="container">
        <Header />
        <hr />
        <WeatherSearch />
        <WeatherResults />
        <WeatherSearchHistoryList/>
      </div>
    </WeatherProvider>

  );
}

export default App;
