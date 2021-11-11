import React, { useEffect, useState } from "react";
import './style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, Link, useRouteMatch, useLocation } from "react-router-dom";
import loader from '../../loader.gif'
import axios from "axios";
import PokeCardGame from "../../components/PokeCardGame"
import PlayerGame from "../../components/PlayerGame"
import Pagination from '@mui/material/Pagination';
import CardMedia from '@mui/material/CardMedia';
import bloodSpot from './blood-spot.png'
import bloodLine from './blood-line.png'

const NewGame = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [cardsOnPage, setCardsOnPage] = useState(48)
  const [dataForPage, setDataForPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [allPages, setAllPages] = useState()
  const [playerOne, setPlayerOne] = useState(null)
  const [playerOneBase, setPlayerOneBase] = useState(null)
  const [playerTwoBase, setPlayerTwoBase] = useState(null)
  const [isPlayerOne, setIsPlayerOne] = useState(false)
  const [isPlayerTwo, setIsPlayerTwo] = useState(false)
  const [playerTwo, setPlayerTwo] = useState(null)
  const [isAllPlayer, setIsAllPlayer] = useState(false)
  const [isBlood, setIsBlood] = useState(false)
  const [bloodOpacity, setBloodOpacity] = useState(1)
  const setPlayer = (e) => {
    // console.log(e.currentTarget.id)
    const id = +e.currentTarget.id;
    console.log(id)

    const player = data.find(item => item.id === id)
    player["id"] = id;
    if (!playerOne) {
      setPlayerOne(player)
      setPlayerOneBase(player.base)
      setIsPlayerOne(true)
      return
    } else {


      setPlayerTwo(player)
      setPlayerTwoBase(player.base)

      setIsPlayerTwo(true)
      setIsAllPlayer(true)
      return
    }
  }
  const changePage = (_, value) => {
    setCurrentPage(value);
    const lastIndex = cardsOnPage * value;
    const firstIndex = lastIndex - cardsOnPage;
    const dataOnPage = data.slice(firstIndex, lastIndex)
    setDataForPage(dataOnPage)
    console.log(dataOnPage)
    console.log(lastIndex)
  };
  const { id } = useParams()


  useEffect(() => {
    setIsLoading(prev => prev = !prev)
    axios.get('https://wbs-pokefight.herokuapp.com/pokemons')
      .then((response) => {
        // handle success
        setData(response.data)
        // setIsLoading(false)
        setAllPages(Math.ceil(response.data.length / cardsOnPage))
        const lastIndex = cardsOnPage * currentPage;
        const firstIndex = lastIndex - cardsOnPage;
        const dataOnPage = response.data.slice(firstIndex, lastIndex)
        setDataForPage(dataOnPage)
      })
      .catch(function (error) {
        console.log(error);
      })


  }, [])

  // Game logic
  const newHpOnAttack = (playerOne, playerTwo) => {

    const hp = playerTwo.HP
    const defense = playerTwo.Defense
    const attack = Math.floor(playerOne.Attack * 0.1 - (defense * 0.01))
    const calculatedHP = hp - attack
    return calculatedHP
  }
  const newHpOnSpAttack = (playerOne, playerTwo) => {

    const hp = playerTwo.HP
    const attack = Math.floor(playerOne["Sp. Attack"] * 0.2)
    const calculatedHP = hp - attack
    return calculatedHP
  }

  const specialAttack = (e) => {
    const id = e.target.id;
    const className = e.currentTarget.classList;
    console.log(id)
    console.log(className.contains("spAttack"))
    // if (id === 1) {
    //   setPlayerTwoBase(prev => {
    //     return { ...prev, "HP": newHpOnSpAttack(playerTwoBase, playerOneBase) }
    //   })
    // } else if (id === 2) {
    //   setPlayerOneBase(prev => {
    //     return { ...prev, "HP": newHpOnSpAttack(playerOneBase, playerTwoBase) }
    //   })
    // }
  }
  const attack = (e) => {
    const id = +e.target.id;
    setIsBlood(true)
    if (id === 1) {
      setPlayerTwoBase(prev => {
        return { ...prev, "HP": newHpOnAttack(playerTwoBase, playerOneBase) }
      })
    } else if (id === 2) {
      setPlayerOneBase(prev => {
        return { ...prev, "HP": newHpOnAttack(playerOneBase, playerTwoBase) }
      })
    }
  }
  useEffect(() => {
    if (isBlood) {
      const timer = setInterval(() => {

        setBloodOpacity(prev => {
          if (prev === 0) {
            return
          }
          setIsBlood(false)
          return prev -= 0.1
        })
      }, 30)
      if (bloodOpacity) return clearInterval(timer)
    }
  }, [isBlood, bloodOpacity])

  return (
    <section className="hero game">
      <Container maxWidth="md">

        <Typography
          className="hero__title title"
          variant="h1"
          component="h1"
        >
          Choose your pokemon!
        </Typography>
        <Stack
          className="player"
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {isAllPlayer && isBlood &&
            <CardMedia
              component="img"
              className="blood"
              image={bloodSpot}
              alt="Pokemon"
              sx={{
                position: 'absolute',
                width: "300px",
                height: "auto",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%)",
                opacity: bloodOpacity,
                transition: "opacity .5s"
              }}
            />
          }
          {isPlayerOne
            ?
            <PlayerGame
              // pokemon={playerOne}
              id={playerOne.id}
              name={playerOne.name}
              type={playerOne.type}
              num="1"
              active={isAllPlayer}
              attack={attack}
              spAttack={specialAttack}
              activePlayer={isPlayerOne}
              base={playerOneBase}
            />
            :
            <PlayerGame
              num="1"
              activePlayer={isPlayerOne}
            />
          }
          {isPlayerTwo ?
            <PlayerGame
              id={playerTwo.id}
              name={playerTwo.name}
              type={playerTwo.type}
              num="2"
              active={isAllPlayer}
              attack={attack}
              spAttack={specialAttack}

              activePlayer={isPlayerTwo}
              base={playerTwoBase}

            />
            :
            <PlayerGame
              num="2"
              activePlayer={isPlayerTwo}

            />
          }

        </Stack>
        {
          !isAllPlayer
            ?
            <Stack spacing={1}>

              <div className="pokemons__row game__row">
                {dataForPage && dataForPage.map(pokemon => {
                  return (
                    <PokeCardGame
                      setPlayer={setPlayer}
                      className="game__card "
                      key={pokemon.id}
                      pokemonId={pokemon.id}
                      name={pokemon.name}
                      type={pokemon.type}
                      base={pokemon.base}
                    />)
                })
                }
              </div>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                < Pagination
                  count={allPages}
                  variant="outlined"
                  shape="rounded"
                  page={currentPage}
                  onChange={changePage} />
              </Stack>
            </Stack>

            :
            null

        }




      </Container>
    </section>
  )
}

export default NewGame;