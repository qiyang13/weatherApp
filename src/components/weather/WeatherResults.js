import React from 'react'
import { useContext } from 'react'
import Spinner from '../layout/Spinner';
import NoRecordFound from '../layout/NoRecordFound';
import moment from 'moment';
import WeatherContext from '../../context/weather/WeatherContext';

const WeatherResults = () => {
  const { weather, loading } = useContext(WeatherContext);

  if (!loading) {
    if (Object.keys(weather).length === 0 || weather === undefined) {
      return <NoRecordFound />
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <p>{weather?.name}, {weather?.sys?.country} </p>
          <h2><b>{weather?.weather?.[0].main}</b></h2>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-2">
            <label for="id1">Description:</label>
          </div>
          <div className="col-xs-6 col-md-10">
            <p>{weather?.weather?.[0]?.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-2">
            <label>Temperature:</label>
          </div>
          <div className="col-xs-6 col-md-10">
            <p>{weather?.main?.temp_min}&deg;C ~ {weather?.main?.temp_max}&deg;C</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-2">
            <label>Humidity:</label>
          </div>
          <div className="col-xs-6 col-md-10">
            <p>{weather?.main?.humidity}%</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-2">
            <label>Time:</label>
          </div>
          <div className="col-xs-6 col-md-10">
            <p>{moment(new Date()).format('YYYY-MM-DD hh:mm A')}</p>
          </div>
        </div>
      </div>

    )
  } else {
    return <Spinner />
  }


}

export default WeatherResults