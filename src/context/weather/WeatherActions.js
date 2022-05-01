
import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const OPEN_WEATHER_API_URL = process.env.REACT_APP_OPEN_WEATHER_API_URL
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const axiosInstance = axios.create({
    baseURL: OPEN_WEATHER_API_URL,
    timeout: 5000,
})

// Get Search Weather
export const searchWeather = async (searchKey) => {
    try {
        const params = new URLSearchParams({
            q: `${searchKey.city},${searchKey.country}`,
        });
        const response = await axiosInstance.get(`/weather?${params}&APPID=${OPEN_WEATHER_API_KEY}`)
        let newHistory;
        const dataProcess = {
            id: uuidv4(),
            city: response.data.name,
            country: response.data.sys.country,
            description: response.data.weather[0].description,
            timestamp: moment(new Date()).format('YYYY-MM-DD hh:mm:ss A')
        }
        const oldHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'));
        if (oldHistory) {
            // Check if the city is already in the history and put them into array as descending order
            newHistory = [dataProcess, ...oldHistory];
        } else {
            newHistory = [dataProcess];
        }
        localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
        return response.data;

    } catch (error) {
        console.log('error');
        throw error;
    }

}

export const deleteWeatherSearchHistory = async (id) => {
    try {
        const weatherSearchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory'));
        const newHistory = weatherSearchHistory.filter(weather => weather.id !== id);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
        return newHistory;
    } catch {
        console.log('error');
    }


}


