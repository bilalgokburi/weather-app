import { createContext, useState } from "react";

const WeatherContext = createContext()

export const WeatherProvider = ({children}) => {

    const [info, setInfo] = useState([]);
    const values = { info, setInfo }

    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}

export default WeatherContext