import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './style.css'
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import loader from '../../loader.gif'
import StatProgressBar from '../StatProgressBar'
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
const PokeCard = ({ pokemonId, name, type, base }) => {
  const [image, setImage] = useState()
  const [color, setColor] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [cardWidth, setCardWidth] = useState(345)
  const findColor = () => {
    const pokeType = type[0].toLowerCase();
    const color = Object.keys(colors).find(item => {
      return item === pokeType
    })
    // console.log(color)
    return color
  }
  const { id } = useParams()
  const { info } = useParams()

  useEffect(() => {
    setIsLoading(true)
    setColor(() => colors[findColor()])

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        // handle success
        setImage(response.data.sprites.other["official-artwork"]["front_default"]);
        setIsLoading(false)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, [])
  useEffect(() => {
    if (info) {
      setCardWidth(600)
    } else {
      setCardWidth(345)
    }
  }, [info])
  return (
    <Card
      sx={{ width: "100%", maxWidth: cardWidth, backgroundColor: color }}
      className="pokemons-card">
      {
        id

          ?

          <CardHeader

            title={name.english || name.japanese}
            subheader={`${name.japanese} / ${name.chinese} / ${name.french}`}
          />

          :
          <CardHeader

            title={name.english || name.japanese}
          />


      }

      {isLoading ?
        <CardMedia
          component="img"
          height="140"
          className="pokemons-card__image"
          image={loader}
          alt="Pokemon loader"
        />
        :

        <CardMedia
          component="img"
          height="140"
          className="pokemons-card__image"
          image={image}
          alt="Pokemon"
        />
      }
      {id &&

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

          {info &&
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
        </CardContent>
      }
      <CardActions>
        {
          info

            ?

            <Link className="pokemons-card__link link" to={`/pokemons`} >
              Back to pokemons
            </Link>

            :

            id

              ?

              <Link className="pokemons-card__link link" to={`/pokemons/${pokemonId}/info`} >
                More information
              </Link>

              :



              <Link className="pokemons-card__link link" to={`/pokemons/${pokemonId}`} >
                About
              </Link>

        }
      </CardActions>
    </Card >
  )
}

export default PokeCard;