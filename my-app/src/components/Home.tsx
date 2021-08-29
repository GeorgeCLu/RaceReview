/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import {
  Grid,
} from '@material-ui/core';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const url = 'https://racereviewmsa.azurewebsites.net/';
  const size = "2rem";

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (windowWidth >= 600) {
    return (
      <div>
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
          <div>Then head to the chat to talk more about motor races with fellow users.</div>
          <br />
          <div><br /></div>
          <div>Share us: on Social media:</div>
          <div>
          <br />
          </div>
          <div>
          <FacebookShareButton
             className="network__share-button"
             url={url}
            >
            <FacebookIcon
              size={size}
            />
          </FacebookShareButton>
          &nbsp;
          <TwitterShareButton
              className="network__share-button"
              url={url}
            >
            <TwitterIcon
              size={size}
            />
          </TwitterShareButton>
          </div>
        </Grid>
      </div>
    );
  }
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
      <div>Then head to the chat to talk more about motor races with fellow users.</div>
      <br />
      <div><br /></div>
      <div>Share us: on Social media:</div>
      <div>
      <br />
      </div>
      <div>
      <FacebookShareButton
         className="network__share-button"
         url={url}
        >
        <FacebookIcon
          size={size}
        />
      </FacebookShareButton>
      &nbsp;
      <TwitterShareButton
          className="network__share-button"
          url={url}
        >
        <TwitterIcon
          size={size}
        />
      </TwitterShareButton>
      </div>
    </Grid>
  </div>
);}

export default Home;
