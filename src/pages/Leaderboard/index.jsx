import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, Link, useRouteMatch } from "react-router-dom";
import loader from '../../loader.gif'
import axios from "axios";
import PokeCard from "../../components/PokeCard"
import "./style.css"


const Leaderboard = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { info } = useParams()


  useEffect(() => {
    setIsLoading(prev => prev = !prev)
    axios.get(`https://wbs-pokefight.herokuapp.com/pokemons/game/leaderboard`)
      .then((response) => {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })



  }, [])

  return (
    <section className="hero leaderbord">
      <Container maxWidth="md">

        <Typography
          className="hero__title title"
          variant="h1"
          component="h1"
        >
          Leaderboard!
        </Typography>
        <div className="leaderbord__row">
          {data ? data.map((item, i) => {
            return (
              <Stack
                key={i}
                direction="row"
                className="leaderbord__item"
              >
                <h3 className="leaderbord__player">Player 1: <br />{item.nameOfFighterOne}</h3>
                <h3 className="leaderbord__player">Player 2: <br />{item.nameOfFighterTwo}</h3>
                <h3 className="leaderbord__winner">Winner: <br /> {item.winner}</h3>
                <h3 className="leaderbord__score">Score: <br />{item.score}</h3>
              </Stack>
            )
          })


            :
            <img src={loader} alt="Loader" />
          }
        </div>



      </Container>
    </section>
  )
}

export default Leaderboard;