import React, { createContext, useContext, useState } from "react";

const FavContext = createContext();

export const useFav = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
    const [user,setUser]= useState(null);
  return (
    <FavContext.Provider value={{ user,setUser }}>
      {children}
    </FavContext.Provider>
  );
};