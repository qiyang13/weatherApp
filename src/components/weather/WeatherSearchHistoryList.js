import React from 'react'
import { useContext } from 'react'
import WeatherContext from '../../context/weather/WeatherContext';
import { useEffect } from 'react';
import WeatherSearchHistoryItem from './WeatherSearchHistoryItem';


const WeatherSearchHistory = () => {
    const { weatherSearchHistory, dispatch } = useContext(WeatherContext);


    useEffect(() => {
        const weatherSearchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'));
        dispatch({ type: 'GET_WEATHER_SEARCH_HISTORY', payload: weatherSearchHistory });
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <h5><b>Search History</b></h5>
            <hr />
            {weatherSearchHistory?.length > 0 ? (
                <ul className="list-group">
                    {weatherSearchHistory?.map((weather, index) => (
                        <WeatherSearchHistoryItem weather={weather} index={index} uuid={weather.id} />
                    ))}
                </ul>
            ) : (
                <p>No search history</p>
            )}
        </>
    )
}

export default WeatherSearchHistory