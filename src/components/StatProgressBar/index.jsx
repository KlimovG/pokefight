import React, { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const StatProgressBar = ({ type, value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === value) {
          return oldProgress;
        }

        return (oldProgress + 1);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [])


  return (
    <LinearProgress className={`pokemons-card__${type}`} variant="determinate" value={progress} />

  )
}

export default StatProgressBar;