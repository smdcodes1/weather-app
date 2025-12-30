import React, { useState } from 'react'
import Card from '../../components/Card/Card';
import { useFav } from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import "../../App.css";
import { useTheme } from '../../context/ThemeContext';
import NavBar from '../../components/NavBar/NavBar';
import { useFavourites } from '../../context/SupabaseFavoritesContext';

const Favorites = () => {
  const { favourites,setFavourites }= useFav();
  // const {favourites,setFavourite}= useFavourites();
  const navigate= useNavigate();
 
  const handleToggleFavourite = (country) => {
        setFavourites((prev) => {
        const exists = prev.find((c) => c.cca3 === country.cca3);
        return exists
            ? prev.filter((c) => c.cca3 !== country.cca3)
            : [...prev, country];
        });
        console.log(country.cca3);

    };
  const handleClick= (country)=> {
      navigate(`/country/${country.cca3}`, {
      state: {
        capital: country.capital?.[0],
        name: country.name.common,
      },
    });
  };
  if (favourites.length === 0) {
      return <div className='all__country__wrapper'><p style={{color:'white',textAlign:'center'}}>No favourite countries yet</p></div>;
    }
  return (
   <div className='country__list'>
    <NavBar />
      <div className='all__country__wrapper'>
        <button onClick={()=> navigate(-1)} >
          Back
        </button>
        <div className="country__bottom">
          {favourites.map((country) => (
            <Card
              key={country.cca3}
              country={country}
              isFavourite={true}
              onToggleFavourite={handleToggleFavourite}
              onClick={handleClick}
            />
          ))}
          
        </div>
      </div>
   </div>
   
  );
}

export default Favorites
