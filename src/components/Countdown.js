import React from 'react';
import { Grid } from '@material-ui/core'
import { Spacer } from './Spacer'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function CountDown(props) {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty")
  const [time, setTime] = React.useState(3);
  const navigate = useNavigate();
  
  // 時間計測
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    console.log(time)
    if (time === 0) {
        navigate(`/play/?difficulty=${difficulty}`)
    }
  }, [time]);

  return (
    <Grid container alignItems="center" justify="center">
        <div align="center">
          <Spacer size={20}/>
          <h1 align="left"> {time} </h1>
        </div>
    </Grid>
  );
}
export default CountDown;
