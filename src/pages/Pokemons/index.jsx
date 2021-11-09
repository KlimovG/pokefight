import React, { useEffect, useState } from "react";
import './style.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, Link, useRouteMatch } from "react-router-dom";
import loader from '../../loader.gif'
import axios from "axios";
import PokeCard from "../../components/PokeCard"
import Pagination from '@mui/material/Pagination';

const Pokemons = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [cardsOnPage, setCardsOnPage] = useState(20)
  const [dataForPage, setDataForPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [allPages, setAllPages] = useState()
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


  return (
    <section className="hero pokemons">
      <Container maxWidth="md">

        <Typography
          className="hero__title title"
          variant="h1"
          component="h1"
        >
          All Pokemons
        </Typography>
        <div className="pokemons__row">
          {dataForPage && dataForPage.map(pokemon => {
            return (
              <PokeCard
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
            sx={{
              marginBottom: "2rem"
            }}
            onChange={changePage} />
        </Stack>


      </Container>
    </section>
  )
}

export default Pokemons;