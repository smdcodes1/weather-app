import './App.css';
import { Routes,Route,Link,Navigate } from 'react-router-dom';
import CountriesList from './pages/CountriesList/CountriesList';
import CountryDetails from './pages/CountryDetails/CountryDetails';
import { useEffect } from 'react';
import { useFav } from './context/FavoritesContext';
import Favorites from "./pages/Favourites/Favorites";
import {Favorite} from '@mui/icons-material';
import { useTheme } from './context/ThemeContext';
import NavBar from './components/NavBar/NavBar';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {supabase} from './supabase/supabaseClient';
import {useAuth} from './context/AuthContext';
import Register from './components/Register/Register';
function App() {
  const { favourites }= useFav();
  const { theme,setTheme }= useTheme();
  const {setUser}= useAuth();
  useEffect(() => {
      const fetchUser = async () => {
        const { data, error } = await supabase
                                            .from("profiles")
                                            .select("*")
                                            .single();
        // if (data) console.log(data.email);
        setUser(data);
      };
  
      fetchUser();
  }, []);
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
 function Login() {
     supabase.auth.signOut();
    return <SigninPage />
  }
 function RegisterAndLogout() {
     supabase.auth.signOut();
    return <SignupPage />
  }
  return (
    <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <CountriesList toggleTheme={toggleTheme} />
            </ProtectedRoute>
          } />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route
          path='/favourites' element={<Favorites />} />
          <Route
          path='/login' element={<Login />} />
          <Route 
          path='/register' element={<RegisterAndLogout />} />
          <Route
          path='/guest' element={<CountriesList toggleTheme={toggleTheme} />} />
          <Route 
          path='*' element={<NotFound />} />
      </Routes>
  );
}

export default App;
