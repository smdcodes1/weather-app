import './App.css';
import { Routes,Route } from 'react-router-dom';
import CountriesList from './pages/CountriesList/CountriesList';
import CountryDetails from './pages/CountryDetails/CountryDetails';
function App() {
  return (
    <>
      <div className="header">
        <div className="container">
          <h5>Where in the world are you!</h5>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
