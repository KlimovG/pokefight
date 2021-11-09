import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, Link, useRouteMatch } from "react-router-dom";
import loader from '../../loader.gif'
import axios from "axios";
import PokeCard from "../../components/PokeCard"


const Pokemons = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { info } = useParams()


  useEffect(() => {
    setIsLoading(prev => prev = !prev)
    axios.get(`https://wbs-pokefight.herokuapp.com/pokemons/${id}`)
      .then((response) => {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })



  }, [])

  return (
    <section className="hero pokemons">
      <Container maxWidth="md">

        {
          data && <Typography className="hero__title title" variant="h1" component="h1" gutterBottom>
            Info about {data.name.english}
          </Typography>
        }
        <div className="pokemons__row">
          {data ?

            <PokeCard
              key={data.id}
              pokemonId={data.id}
              name={data.name}
              type={data.type}
              base={data.base}
            />
            :
            <img src={loader} alt="Loader" />
          }
        </div>



      </Container>
    </section>
  )
}

export default Pokemons;