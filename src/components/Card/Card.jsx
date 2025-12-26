import React from 'react'
import "./Card.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
const Card = ({country,onClick,isFavourite,onToggleFavourite}) => {
 const handleFavouriteClick = (e) => {
    e.stopPropagation();
    onToggleFavourite(country);
    // console.log(isFavourite);
            };
  return (
    <div
      className="country__card"
      onClick={() => onClick(country)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(country)}
    >
      <div className="favourite__icon" onClick={handleFavouriteClick}>
        {isFavourite ? (
          <Favorite />
        ) : (
          <FavoriteBorder />
        )}
      </div>
      <div className="country__img">
        <img
          src={country?.flags?.png}
          alt={`${country?.name?.common} flag`}
          loading="lazy"
        />
      </div>

      <div className="country__data">
        <h3>{country?.name?.common}</h3>

        <h6>
          Population: {country?.population ?? "N/A"}
        </h6>

        <h6>Region: {country?.region ?? "N/A"}</h6>

        <h6>
          Capital: {Array.isArray(country?.capital)
            ? country.capital[0]
            : country?.capital ?? "N/A"}
        </h6>
      </div>
    </div>
  );
}

export default Card
