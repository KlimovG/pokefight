import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './style.css'
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import loader from '../../loader.gif'
import StatProgressBar from '../StatProgressBar'
import questionImage from './question.png'
import playerUnknown from './playerUnknown.png'
const colors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};
const PlayerGame = ({ id, type, name, num, active, attack, playerName, base, spAttack }) => {
  const [image, setImage] = useState(null)
  const [color, setColor] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [cardWidth, setCardWidth] = useState(345)
  const [spAttackCount, setSpAttackCount] = useState(3)

  const { info } = useParams()


  const enableSpAttack = (e) => {
    const name = e.target.classList
    console.log(name)
    if (name.contains("attack")) {
      console.log("is attack")
      if (spAttackCount < 3) {
        setSpAttackCount(prev => prev += 1)
      }
    } else if (name.contains("spAttack")) {
      setSpAttackCount(prev => prev = 0)

    }
  }

  useEffect(() => {

    if (id) {

      const findColor = () => {
        const pokeType = type[0].toLowerCase();
        const color = Object.keys(colors).find(item => {
          return item === pokeType
        })
        // console.log(color)
        return color
      }
      setIsLoading(true)
      setColor(() => colors[findColor()])

      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          // handle success
          setImage(response.data.sprites["front_default"]);
          setIsLoading(false)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }

  }, [id])
  useEffect(() => {

  }, [type])
  return (
    <Box className="player__wrap" >
      <Typography variant="h6" color="text.secondary" sx={{ marginBottom: ".5rem" }}>
        {playerName}
      </Typography>
      <Card
        sx={{ width: "100%", maxWidth: 100, backgroundColor: color }}
        className={active ? "player__game-card active" : "player__game-card"}>
        {
          active && name

          &&

          <CardHeader

            title={name.english || name.japanese}
          />



        }

        {image === null ?
          <Stack>

            <CardMedia
              component="img"
              className="player__image"
              image={playerUnknown}
              alt="Pokemon"
            />
          </Stack>
          :
          <Stack>

            <CardMedia
              component="img"
              className="player__image"
              image={image}
              alt="Pokemon"
            />
          </Stack>

        }
        {/* {id &&

        <CardContent>

          <Typography variant="h6" color="text.secondary">
            Types:
            {type && type.map((item, i) => {
              return (
                <span key={i}> <strong>#{item}</strong>  </span>
              )
            })}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className="pokemons-card__row"
            mb={3}
          >

            {type && type.map((type, i) => (
              <Avatar key={i} alt="Pokemons type" src={`http://localhost:3000/img/${type.toLowerCase()}.svg`} />
            ))}
          </Stack>


        </CardContent>
      } */}
        {active && base &&
          <div className="pokemons-card__row-base" style={{ background: "rgba(256,256,256,.5)" }}>

            <Typography variant="h6" color="text.secondary" sx={{ marginBottom: ".5rem" }}>
              Base information:
            </Typography>
            {base && Object.entries(base).map(([key, value], i) => {
              const classFromKey = key.toLowerCase().split(" ").map(word => word.replace(/[^a-zA-Z ]/g, "")).join("")
              return (
                <Stack
                  className={`pokemons-card__base`}
                  key={i}
                  sx={{ width: '100%', color: 'grey.500' }}
                  direction="row"
                  alignItems="center"
                  spacing={2}>
                  <span > <strong>#{key}</strong></span>
                  <StatProgressBar type={classFromKey} value={value} variant="determinate" />
                </Stack>
              )
            })}
          </div>
        }
        {active &&
          <Stack>
            <button className="button button--attack attack" name={num} onClick={(e) => {
              attack(e)
              enableSpAttack(e)
            }}> Attack</button>
            {spAttackCount === 3 ?

              <button className="button button--attack spAttack" name={num} onClick={(e) => {
                spAttack(e)
                enableSpAttack(e)

              }}> Special attack</button>

              :

              <button className="button button--attack spAttack" name={num} onClick={(e) => {
                spAttack(e)
                enableSpAttack(e)

              }} disabled> Special attack</button>

            }

          </Stack>
        }
      </Card >
    </Box>
  )
}

export default PlayerGame;