import React, { useEffect, useState } from 'react'
import apiClent from '../../services/countryApi';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from "../../components/Search/SearchInput";
import FilterCountry from "../../components/Filter/FilterCountry";
import Card from '../../components/Card/Card';
import { useFav } from '../../context/FavoritesContext';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
const CountriesList = ({toggleTheme}) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // const [favourites, setFavourites] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    const { favourites,setFavourites }= useFav();
    const { theme }= useTheme();
    const handleToggleFavourite = (country) => {
        setFavourites((prev) => {
        const exists = prev.find((c) => c.cca3 === country.cca3);
        return exists
            ? prev.filter((c) => c.cca3 !== country.cca3)
            : [...prev, country];
        });
        // console.log(country.cca3);
    };
    const isFavourite = (country)=> favourites.some((c) => c.cca3 === country.cca3);

  const navigate= useNavigate();
    const getAllCountries = async () => {
        setLoading(true);
        try {
            const response = await apiClent.get("/all?fields=name,cca3,flags,capital,region");

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
    // const getCountryByName = async (countryName) => {
    //     setLoading(true);
    //     try {
    //         const response = await apiClent.get(`/name/${countryName}`);

    //         // if (!response.ok) throw new Error("Not found any country! So pls refresh the page");

    //         const data = await response.data;
    //         setCountries(data);

            
    //     } catch (error) {
    //         setError("Not found any country! So pls refresh the page");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const filterCountries= countries.filter((country)=> country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const getCountryByRegion = async (regionName) => {
        setLoading(true);
        try {
            if (regionName === 'all') return getAllCountries();
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
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="country__top">
                <div className="search">
                    <SearchInput setSearchTerm={setSearchTerm} />
                </div>

                <div className="filter">
                    <FilterCountry onSelect={getCountryByRegion} />
                </div>
                
            </div>

            <div className="country__bottom">
                {loading && !error && <h4>Loading........</h4>}
                {error && !loading && <h4>{error}</h4>}

                {filterCountries?.map((country, index) => (
                    // <div className="country__card" onClick={()=> handleClick(country)} key={index}>
                    //         <div className="country__img">
                    //             <img src={country.flags.png} alt="" />
                    //         </div>

                    //         <div className="country__data">
                    //             <h3>{country.name.common}</h3>
                    //             <h6>
                    //                 {" "}
                    //                 Population:{" "}
                    //                 {new Intl.NumberFormat().format(country.population)}
                    //             </h6>
                    //             <h6> Region: {country?.region ?? "N/A"}</h6>
                    //             <h6>Capital: {country?.capital ?? "N/A"}</h6>
                    //         </div>
                    //     </div>
                 <Card
                 key={index}
                 country={country}
                 onClick={handleClick}
                 isFavourite={isFavourite(country)}
                 onToggleFavourite={handleToggleFavourite}
                  />
                ))}
            </div>
        </div>
    );
}

export default CountriesList
