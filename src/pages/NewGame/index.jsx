//Import react 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import styles
import './style.css'

// Import mui components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// Import custom components
import NewPlayer from "../../components/NewPlayer"

const NewGame = () => {
  const [isMode, setIsMode] = useState(false)
  const [isPVP, setIsPVP] = useState(false)
  const [isPVE, setIsPVE] = useState(false)
  const [playerName, setPlayerName] = useState([])
  const history = useHistory()

  useEffect(() => {
    if (playerName.length) {
      history.push("/game", [playerName])
    }
  }, [playerName])
  const setName = (e) => {
    e.preventDefault()
    const form = document.forms[0]
    if (isPVP) {
      for (let i = 0; i < 2; i++) {
        console.log(form[i].name)
        console.log(form[i].value)
        setPlayerName(prev => [...prev, form[i].value])
      }
      return
    }
    setPlayerName([form[0].value])


  }
  const toggleMode = (e) => {
    const modeName = e.target.name
    setIsMode(true)
    modeName === "pvp" ? setIsPVP(true) : setIsPVE(true)
  }

  return (
    <section className="hero game">
      <Container maxWidth="md">
        {!isMode

          ?


          <Box>
            <Typography align="center" variant="h2" gutterBottom component="div">
              Choose mode:
            </Typography>
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"

            >
              <button onClick={(e) => toggleMode(e)} name="pvp" className="button button--main">1 vs. 1</button>
              <button onClick={(e) => toggleMode(e)} name="pve" className="button button--main">1 vs. PC</button>
            </Stack>
          </Box>

          :

          isPVP

            ?

            <Stack
              alignItems="center"

            >
              <Stack
                spacing={4}
                justifyContent="center"
                alignItems="center"
                direction="row"
                mb={4}
              >

                <NewPlayer
                  setName={setName}
                  mode={"pvp"}
                />
              </Stack>

            </Stack>

            :

            <Stack
              alignItems="center"

            >
              <Stack
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >

                <NewPlayer
                  mode={"pve"}
                  setName={setName}

                />
              </Stack>

            </Stack>


        }
      </Container>
    </section>
  )
}

export default NewGame;