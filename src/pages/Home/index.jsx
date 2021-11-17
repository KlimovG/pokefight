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
    <section className="section hero">
      <Container maxWidth="sm">
        <Typography className="hero__title title" variant="h1" component="h1" gutterBottom>
          Play a game?
        </Typography>
        <Stack spacing={4} direction="column" justifyContent="center" alignItems="center">
          <Link className="button button--main" to="/pokemons">see all pokemons</Link>
          <Link className="button button--main" to="/newgame">new game</Link>
          <Link className="button button--main" to="/leaderbord">score</Link>
        </Stack>
      </Container>
    </section>
  )
}

export default Home;