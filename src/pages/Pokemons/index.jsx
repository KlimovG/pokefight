import React, { useEffect, useState } from "react";
import './style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {

  Link
} from "react-router-dom";
import axios from "axios";
import PokeCard from "../../components/PokeCard"

const Pokemons = () => {
  const [data, setData] = useState()


  useEffect(() => {
    axios.get('http://localhost:3000/pokemons')
      .then((response) => {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [])
  return (
    <section className="hero pokemons">
      <Container maxWidth="md">
        <Typography className="hero__title" variant="h1" component="h1" gutterBottom>
          Pokemons
        </Typography>
        <div className="pokemons__row">
          {/* <Link className="hero__btn" to="/pokemons">see all pokemons</Link> */}
          {
            data && data.map(pokemon => {
              return (
                <PokeCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.type}
                  base={pokemon.base}
                />

              )
            })
          }
        </div>
      </Container>
    </section>
  )
}

export default Pokemons;