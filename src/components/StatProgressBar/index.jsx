import React, { useState, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';

const StatProgressBar = ({ type, value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentValue = Math.ceil(value / 1.3)
    console.log(currentValue)
    setProgress((oldProgress) => {
      return oldProgress = currentValue
      //   if (oldProgress >= currentValue) {
      //     return oldProgress;
      //   }

      //   return (oldProgress + 1);
    });
    const timer = setInterval(() => {
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [value])


  return (
    <LinearProgress className={`pokemons-card__${type}`} variant="determinate" value={progress} />

  )
}

export default StatProgressBar;