import React, { useEffect, useState } from 'react'
import { useParams,Link,useNavigate, useLocation } from 'react-router-dom';
// import { API_URL } from '../../services/api';
import apiClent from '../../services/countryApi';
import { fetchWeatherByCity } from '../../services/weatherApi';
const CountryDetails = () => {
    const [country, setCountry] = useState([]);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // const { countryName } = useParams();
    const {state}= useLocation();
    const capital = state.capital;
    const countryName= state?.name;
    const navigate= useNavigate();
    // const borders = country.map((country) => country.borders);
    useEffect(() => {
        // if (!capital) return;
        setLoading(true);
        const getCountryByName = async () => {
            try {
                const response = await apiClent.get(`/name/${countryName}`);

                // if (!response.ok) throw new Error("Could not found!");

                const data = await response.data;

                setCountry(data);
                
            } catch (error) {
                setError(error.response?.data?.message || "Could not found!");
            } finally {
                setLoading(false);
            }
        };
        getCountryByName();
        fetchWeatherByCity(capital)
        .then(setWeather).catch((err)=> {console.log(err)});
    }, [countryName,capital]);
    return (
        <div className="country__info__wrapper">
            <button onClick={()=> navigate("/")}>
                Back
            </button>

            {loading && !error && <h4>Loading........</h4>}
            {error && !loading && <h4>{error}</h4>}

            {country?.map((country, index) => (
                <div className="country__info__container" key={index}>
                    <div className="country__info-img">
                        <img src={country.flags.png} alt="" />
                    </div>

                    <div className="country__info">
                        <h3>{country.name.common}</h3>

                        <div className="country__info-left">
                            <h5>
                                Population:{" "}
                                <span>
                                    {new Intl.NumberFormat().format(country.population)}
                                </span>
                            </h5>
                            <h5>
                                Region: <span>{country.region}</span>
                            </h5>
                            <h5>
                                Sub Region: <span>{country.subregion}</span>
                            </h5>
                            <h5>
                                Langauge: <span>N/A</span>
                            </h5>
                            <h5>
                                Currency: <span>N/A</span>
                            </h5>
                            <h5>
                                Time Zones: <span>N/A</span>
                            </h5>
                            <h5>
                                Capital: <span>{country.capital}</span>
                            </h5>
                            <h5>
                                Temperature: {weather?.main?.temp ?? '10'} °C
                            </h5>
                            <h5>
                                Condition: <span>{weather?.weather[0]?.description ?? "Cloudy" }</span>
                            </h5>
                            <h5>
                                Humidity: {weather?.main?.humidity ?? "60"}%
                            </h5>
                            <h5>
                                Wind Speed: {weather?.wind?.speed ?? "1"} m/s
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CountryDetails
