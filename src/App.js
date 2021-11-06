import './App.css';
import React from "react";

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Home from './pages/Home';
import Pokemons from './pages/Pokemons';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {
  return (
    <>
      <Header />
      <Routes>

        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>

  );
}

export default App;
