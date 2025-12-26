import React, { createContext, useContext, useState } from "react";

const FavContext = createContext();

export const useFav = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
      const stored = localStorage.getItem("favourites");
      return stored ? JSON.parse(stored) : [];
  });
  return (
    <FavContext.Provider value={{ favourites,setFavourites }}>
      {children}
    </FavContext.Provider>
  );
};