import './App.css';
import './fonts.css'
import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Pokemons from './pages/Pokemons';
import PokemonPage from './pages/PokemonPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import colors from './components/PokeCard/pokemon-colors'
import HomeIcon from '@mui/icons-material/Home';

function App() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  }
  console.log(colors("fire"))
  return (
    <>
      <Header />
      <ButtonGroup
        sx={{ zIndex: "100", position: "fixed" }}
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button className="nav__btn" key="one" onClick={goHome} endIcon={<HomeIcon />}></Button>
        <Button key="two">Two</Button>
      </ButtonGroup>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons/" element={<Pokemons />} />
        <Route path="/pokemons/:id/:info" element={<PokemonPage />} />
        <Route path="/pokemons/:id" element={<PokemonPage />} />
      </Routes>
    </>

  );
}

export default App;
