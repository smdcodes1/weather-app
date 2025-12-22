import React, { useEffect, useState } from 'react'
import apiClent from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from "../../components/Search/SearchInput";
import FilterCountry from "../../components/Filter/FilterCountry";
const CountriesList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate= useNavigate();
    const getAllCountries = async () => {
        setLoading(true);
        try {
            const response = await apiClent.get("/all?fields=name,cca3,flags");

            // if (!response.ok) throw new Error("Something went wrong!");

            const data = await response.data;

            // console.log(data);

            setCountries(data);

            
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    const getCountryByName = async (countryName) => {
        setLoading(true);
        try {
            const response = await apiClent.get(`/name/${countryName}`);

            // if (!response.ok) throw new Error("Not found any country! So pls refresh the page");

            const data = await response.data;
            setCountries(data);

            
        } catch (error) {
            setError("Not found any country! So pls refresh the page");
        } finally {
            setLoading(false);
        }
    };
    const getCountryByRegion = async (regionName) => {
        setLoading(true);
        try {
            const response = await apiClent.get(`/region/${regionName}`);

            // if (!response.ok) throw new Error("Failed... So pls refresh the page");

            const data = await response.data;
            setCountries(data);

            
        } catch (error) {
            setError("Failed... So pls refresh the page");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCountries();
    }, []);
    const handleClick= (country)=> {
      navigate(`/country/${country.cca3}`, {
      state: {
        capital: country.capital?.[0],
        name: country.name.common,
      },
    });
    };
    return (
        <div className="all__country__wrapper">
            <div className="country__top">
                <div className="search">
                    <SearchInput onSearch={getCountryByName} />
                </div>

                <div className="filter">
                    <FilterCountry onSelect={getCountryByRegion} />
                </div>
            </div>

            <div className="country__bottom">
                {loading && !error && <h4>Loading........</h4>}
                {error && !loading && <h4>{error}</h4>}

                {countries?.map((country, index) => (
                    <div className="country__card" onClick={()=> handleClick(country)} key={index}>
                            <div className="country__img">
                                <img src={country.flags.png} alt="" />
                            </div>

                            <div className="country__data">
                                <h3>{country.name.common}</h3>
                                <h6>
                                    {" "}
                                    Population:{" "}
                                    {new Intl.NumberFormat().format(country.population)}
                                </h6>
                                <h6> Region: {country?.region ?? "N/A"}</h6>
                                <h6>Capital: {country?.capital ?? "N/A"}</h6>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default CountriesList
