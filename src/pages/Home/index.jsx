import React from "react";
import './style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {

  Link
} from "react-router-dom";
const Home = () => {

  return (
    <section className="hero">
      <Container maxWidth="sm">
        <Typography className="hero__title title" variant="h1" component="h1" gutterBottom>
          Play a game?
        </Typography>
        <Stack spacing={4} direction="row" justifyContent="center">
          <Link className="hero__btn" to="/pokemons">see all pokemons</Link>
          <button className="hero__btn" >new game</button>
          <button className="hero__btn" >results</button>
        </Stack>
      </Container>
    </section>
  )
}

export default Home;