const weatherReducer = (state, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            return {
                ...state,
                weather: action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }

        case 'CLEAR_WEATHER':
            return {
                ...state,
                weather: {},
                loading: false,
            }

        case 'GET_WEATHER_SEARCH_HISTORY':
            return {
                ...state,
                weatherSearchHistory: action.payload,
            }



        default:
            return state

    }
}

export default weatherReducer;
