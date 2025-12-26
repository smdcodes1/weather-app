import './App.css';
import { Routes,Route,Link } from 'react-router-dom';
import CountriesList from './pages/CountriesList/CountriesList';
import CountryDetails from './pages/CountryDetails/CountryDetails';
import { useEffect } from 'react';
import { useFav } from './context/FavoritesContext';
import Favorites from "./pages/Favourites/Favorites";
import {Favorite} from '@mui/icons-material';
import { useTheme } from './context/ThemeContext';
import NavBar from './components/NavBar/NavBar';
function App() {
  const { favourites }= useFav();
  const { theme,setTheme }= useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <NavBar />
      <div className="country__list">
        <Routes>
          <Route path="/" element={<CountriesList toggleTheme={toggleTheme} />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route
          path='/favourites' element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
