import React, { useState, useEffect } from "react";
import './style.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

const PokeCard = ({ id, name, type, base }) => {
  const [img, setImage] = useState()
  // useEffect(() => {
  //   setTypes(Object.entries(type))
  // }, [])
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        // handle success
        setImage(response.data.sprites.other["official-artwork"]["front_default"]);
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
    <Card sx={{ width: 345 }} className="pokemons-card">
      <CardMedia
        component="img"
        height="140"
        className="pokemons-card__image"
        image={img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {id}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Name:
          {name.english} / {name.japanese} / {name.chinese} / {name.french}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Types:
          {type && type.map((item, i) => {
            return (
              <span key={i}> #{item} </span>
            )


          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default PokeCard;