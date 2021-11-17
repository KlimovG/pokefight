import './App.css';
import './fonts.css'
import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Pokemons from './pages/Pokemons';
import PokemonPage from './pages/PokemonPage';
import NewGame from './pages/NewGame';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import colors from './components/PokeCard/pokemon-colors'
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFF9E1',
      main: '#FFF9E1',
      dark: '#FF9D00'
    },
  },
});

function App() {
  const history = useHistory();
  const goHome = () => {
    history.push("/");
  }
  const goBack = () => {
    history.goBack();
  }
  const goForward = () => {
    history.goForward();
  }
  console.log(colors("fire"))
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>

        <ButtonGroup
          orientation="horizontal"
          aria-label="vertical contained button group"
          variant="contained"
          className="nav"
        >
          <Button className="" key="one" onClick={goBack}>
            <ArrowBackIosIcon />
          </Button>
          <Button className="nav__btn" key="two" onClick={goHome}>
            <HomeIcon />
          </Button>
          <Button className="" key="thre" onClick={goForward}>
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </ThemeProvider>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route exact path="/pokemons/" >
          <Pokemons />
        </Route>
        <Route path="/pokemons/:id/:info" >
          <PokemonPage />
        </Route>
        <Route path="/pokemons/:id" >
          <PokemonPage />
        </Route>
        <Route path="/newgame/" >
          <NewGame />
        </Route>
        <Route path="/game/:id" >
          <Game />
        </Route>
        <Route path="/game/" >
          <Game />
        </Route>
        <Route path="/leaderbord" >
          <Leaderboard />
        </Route>
        {/* <Route path="/newgame/newuser/" element={<PokemonPage />} />
        <Route path="/newgame/game/:count" element={<PokemonPage />} /> */}
      </Switch>
    </>

  );
}

export default App;
