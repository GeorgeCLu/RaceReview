/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import {
  Grid,
} from '@material-ui/core';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
  <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
    <br />
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
      <h2>Home</h2>
      <br />
      <h3>User reviews of old motor races.</h3>
      <br />
      <div>Want to (re)watch old races, but don't know which ones are worth your time?</div>
      <br />
      <div>Look up old races as rated by users of RaceReview by year, championship and more.</div>
      <br />
      <div>Users can review old races as well as add races if they are not listed yet.</div>
      <br />
      <div>Then head to the chat to talk more with fellow users about motor races.</div>
      <br />
      <br />
    </Grid>
  </div>
);}

export default Home;
