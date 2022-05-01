import React from 'react'
import { useState, useContext } from 'react'
import WeatherContext from '../../context/weather/WeatherContext';
import { searchWeather } from '../../context/weather/WeatherActions';

const WeatherSearch = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const { dispatch } = useContext(WeatherContext);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // form validation
        if (city === '' || country === '') {
            alert('Please enter a city and country');
        } else {
            try {
                dispatch({ type: 'SET_LOADING' });
                const searchTerm = {
                    city,
                    country
                }
                const weather = await searchWeather(searchTerm);
                if (weather) {
                    dispatch({ type: 'GET_WEATHER', payload: weather });
                    const weatherSearchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'));
                    dispatch({ type: 'GET_WEATHER_SEARCH_HISTORY', payload: weatherSearchHistory });
                    setCity('');
                    setCountry('');
                } 
            } catch (err) {
                const weather = {}
                dispatch({ type: 'GET_WEATHER', payload: weather });
            }
        }
    }

    const clearWeatherResults = () => {
        dispatch({ type: 'CLEAR_WEATHER' });
        setCity('');
        setCountry('');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className="input-group">
                            <label htmlFor="city">City</label>&nbsp;&nbsp;
                            <input type="text" id="city" className="form-control" placeholder="London"
                                value={city}
                                onChange={handleCityChange}
                            />&nbsp;&nbsp;
                            <label htmlFor="country">Country</label>&nbsp;&nbsp;
                            <input type="text" id="country" className="form-control" placeholder="UK"
                                value={country}
                                onChange={handleCountryChange}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <span className="input-group-btn">
                            <button className="btn btn-secondary"
                                type="submit">Search</button>
                        </span>&nbsp;&nbsp;
                        <span className="input-group-btn">
                            <button className="btn btn-secondary"
                                onClick={clearWeatherResults}
                                type="button">Clear</button>
                        </span>
                    </div>
                </div>
            </form>
        </div >

    )
}

export default WeatherSearch