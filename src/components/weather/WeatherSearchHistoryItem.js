import React from 'react'
import { FaTrash, FaSearch } from 'react-icons/fa';
import { deleteWeatherSearchHistory, searchWeather } from '../../context/weather/WeatherActions';
import WeatherContext from '../../context/weather/WeatherContext';
import { useContext } from 'react'

const WeatherSearchHistoryItem = ({ weather, index, uuid }) => {
  const { dispatch } = useContext(WeatherContext);

  const handleSearch = async (searchTerm) => {
    dispatch({ type: 'SET_LOADING' });
    const weather = await searchWeather(searchTerm);
    dispatch({ type: 'GET_WEATHER', payload: weather });
    const weatherSearchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'));
    dispatch({ type: 'GET_WEATHER_SEARCH_HISTORY', payload: weatherSearchHistory });
  }

  const handleDelete = async (id) => {
    const weatherSearchHistory = await deleteWeatherSearchHistory(id);
    dispatch({ type: 'GET_WEATHER_SEARCH_HISTORY', payload: weatherSearchHistory });
  }

  return (
    <li className="list-group-item" key={uuid}>
      <div className="row">
        <div className="col-xs-6 col-md-6">
          <h6> {index + 1}. {weather.city},{weather.country}</h6>
          <p>{weather.description}</p>
        </div>
        <div className="col-xs-6 col-md-6">
          <b>{weather.timestamp}</b>&nbsp;
          <button className="btn btn-sm btn-info" onClick={() => handleSearch({city: weather.city, country: weather.country})} ><FaSearch /></button>&nbsp;
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(weather.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </li>
  )
}

export default WeatherSearchHistoryItem