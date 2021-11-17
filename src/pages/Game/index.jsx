import React, { useEffect, useState } from "react";
import './style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, useHistory } from "react-router-dom";
import loader from '../../loader.gif'
import axios from "axios";
import PokeCardGame from "../../components/PokeCardGame"
import PlayerGame from "../../components/PlayerGame"
import Pagination from '@mui/material/Pagination';
import CardMedia from '@mui/material/CardMedia';
import bloodSpot from './blood-spot.png'
import bloodLine from './blood-line.png'

const Game = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [cardsOnPage, setCardsOnPage] = useState(48)
  const [dataForPage, setDataForPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [allPages, setAllPages] = useState(41)
  const [playerOne, setPlayerOne] = useState(null)
  const [playerTwo, setPlayerTwo] = useState(null)
  const [playerName, setPlayerName] = useState(null)
  const [playerOneBase, setPlayerOneBase] = useState(null)
  const [playerTwoBase, setPlayerTwoBase] = useState(null)
  const [isPlayerOne, setIsPlayerOne] = useState(false)
  const [isPlayerTwo, setIsPlayerTwo] = useState(false)
  const [isAllPlayer, setIsAllPlayer] = useState(false)
  const [isBlood, setIsBlood] = useState(false)
  const [bloodOpacity, setBloodOpacity] = useState(1)
  const [winner, setWinner] = useState()
  const [score, setScore] = useState()

  const { id } = useParams()

  const history = useHistory()
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
  };


  useEffect(() => {
    setPlayerName(history.location.state[0])
    setIsLoading(prev => prev = !prev)
    axios.get(`https://wbs-pokefight.herokuapp.com/pokemons/page/${currentPage}`)
      .then((response) => {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })


  }, [currentPage])

  // Game logic
  const newHpOnAttack = (playerOne, playerTwo) => {

    const hp = playerTwo.HP

    const defense = playerTwo.Defense
    const attack = Math.ceil(Math.random() * Math.floor(playerOne.Attack * 0.1 - (defense * 0.01)))
    console.log(`attack = ${attack}`)
    const calculatedHP = hp - attack
    return calculatedHP
  }
  const newHpOnSpAttack = (playerOne, playerTwo) => {

    const hp = playerTwo.HP
    const defense = playerTwo["Sp. Defense"]
    console.log(typeof defense)
    const attack = Math.ceil(Math.random() * Math.floor(playerOne["Sp. Attack"] * 0.2 - (defense * 0.01)))
    const calculatedHP = hp - attack
    return calculatedHP
  }

  const specialAttack = (e) => {
    const id = +e.target.name;
    if (id === 1) {
      console.log(playerOneBase)
      setPlayerTwoBase(prev => {
        return { ...prev, "HP": newHpOnSpAttack(playerTwoBase, playerOneBase) }
      })
    } else if (id === 2) {
      console.log(playerTwoBase)

      setPlayerOneBase(prev => {
        return { ...prev, "HP": newHpOnSpAttack(playerOneBase, playerTwoBase) }
      })
    }
  }
  const attack = (e) => {
    const id = +e.target.name;
    console.log(id)
    if (id === 1) {
      console.log(playerOneBase)
      setPlayerTwoBase(prev => {
        return { ...prev, "HP": newHpOnAttack(playerTwoBase, playerOneBase) }
      })
    } else if (id === 2) {
      console.log(playerTwoBase)

      setPlayerOneBase(prev => {
        return { ...prev, "HP": newHpOnAttack(playerOneBase, playerTwoBase) }
      })
    }
  }
  useEffect(() => {
    if (playerOneBase && playerTwoBase) {

      const playerOneHp = playerOneBase.HP;
      const playerTwoHp = playerTwoBase.HP;
      if (playerOneHp <= 0) {
        setScore(playerTwoHp * 3)
        return setWinner(playerName[1] || "PC")
      } else if (playerTwoHp <= 0) {
        setScore(playerOneHp * 3)
        return setWinner(playerName[0])
      }
    }
  }, [playerOneBase, playerTwoBase])

  useEffect(() => {
    if (winner && score) {
      axios.post(`https://wbs-pokefight.herokuapp.com/pokemons/game/save`, {
        nameOfFighterOne: playerName[0],
        nameOfFighterTwo: playerName[1] || "PC",
        winner: winner,
        score: Number(score)
      })
        .then((response) => {
          console.log(response.data)
          setTimeout(() => {
            history.push("/")
          }, 5000)
        })
        .catch(function (error) {
          console.log(error);
        })

    }

  }, [winner, score])

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
  useEffect(() => {
    if (isAllPlayer) history.push("/game/1")
  }, [isAllPlayer])
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
          {/* Blood */}
          {/* {isAllPlayer && isBlood &&
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
          } */}
          {winner &&
            <Typography
              className="hero__title title"
              variant="h1"
              component="h1"
            > {winner} is won!
            </Typography>
          }
          {!winner && id && (
            <>

              <PlayerGame
                // pokemon={playerOne}
                id={playerOne.id}
                name={playerOne.name}
                type={playerOne.type}
                playerName={playerName[0]}
                active={isAllPlayer}
                attack={attack}
                spAttack={specialAttack}
                activePlayer={isPlayerOne}
                base={playerOneBase}
                num="1"
              />
              <PlayerGame
                id={playerTwo.id}
                name={playerTwo.name}
                type={playerTwo.type}
                playerName={playerName[1] || "PC"}
                active={isAllPlayer}
                attack={attack}
                spAttack={specialAttack}
                activePlayer={isPlayerTwo}
                base={playerTwoBase}
                num="2"
              />
            </>
          )}
          {!isAllPlayer
            &&
            <>
              {!isPlayerOne ?
                playerName &&
                <PlayerGame
                  playerName={playerName[0]}
                  activePlayer={isPlayerOne}
                />
                :
                <PlayerGame
                  id={playerOne.id}
                  type={playerOne.type}
                  playerName={playerName[0]}
                  activePlayer={isPlayerOne}
                />
              }
              {!isPlayerTwo ?
                playerName &&
                <PlayerGame
                  playerName={playerName[1] || "PC"}
                  activePlayer={isPlayerTwo}
                />
                :
                <PlayerGame
                  id={playerTwo.id}
                  type={playerTwo.type}
                  playerName={playerName[1] || "PC"}
                  activePlayer={isPlayerTwo}
                />
              }
            </>
          }
        </Stack>
        {
          !id &&
          <Stack spacing={1}>

            <div className="pokemons__row game__row">
              {data && data.map(pokemon => {
                return (
                  <PokeCardGame
                    setPlayer={setPlayer}
                    className="game__card"
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

        }




      </Container>
    </section>
  )
}

export default Game;