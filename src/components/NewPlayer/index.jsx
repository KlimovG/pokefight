import React, { useState, useEffect } from "react";
import './style.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFF9E1',
      main: '#FF9D00',
      dark: '#FF9D00'
    },
  },
});

const NewPlayer = ({ label, setName, mode }) => {


  return (
    <Box >
      <Typography align="center" variant="h6" gutterBottom component="h2">
        Give your name:
      </Typography>
      <form
        className="newplayer__form"
        onSubmit={(e) => setName(e)} name={label}
      >

        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction="row"
          mb={2}
        >

          {mode === "pvp"

            ?
            <ThemeProvider theme={theme}>
              <TextField
                className="newplayer__input"
                id="filled-basic"
                label="Player 1"
                variant="filled"
                name="player1"
                placeholder="Give your name"
              />
              <TextField
                className="newplayer__input"
                id="filled-basic"
                label="Player 2"
                variant="filled"
                name="player2"
                placeholder="Give your name"
              />
            </ThemeProvider>

            :

            <ThemeProvider theme={theme}>
              <TextField
                className="newplayer__input"
                id="filled-basic"
                label="Player 1"
                variant="filled"
                placeholder="Give your name"
              />
            </ThemeProvider>


          }

        </Stack>
        <button type="submit" className="newplayer__btn button button--main">Save</button>

      </form>

    </Box >
  )
}

export default NewPlayer;