/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import {
  Container,
  Button,
  Toolbar,
  AppBar,
  IconButton,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { Alert } from '@material-ui/lab';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';

import Home from './components/Home';
import Login from './components/Login';
import Chat from './components/Chat';
import Races from './components/Races';
import Race from './components/Race';
import Add from './components/Add';
import Sidedrawer from './components/Sidedrawer';
// import r from './assets/RV3.png';
import r from './assets/RV3.png';
import raceService from './services/race';
import reviewService from './services/review';
// import RaceType from './common/race.ts';
// import ReviewType from './common/review.ts';
// eslint-disable-next-line import/no-unresolved
import useStyles from './components/UseStyles';
// import useStyles from './components/UseStyles.js';

interface ReviewType {
  reviewId: (number)
  reviewText: (string)
  reviewScore: (number)
  reviewerName: (string)
  upvotes: (number)
  timeCreated: (string)
  raceId: (number)
  }

  interface RaceType {
    year: (number)
    championship: (string)
    raceName: (string)
    track: (string)
    location: (string)
    raceId: (number)
    averageScore: (number)
    scoreSum: (number)
    totalReviews: (number)
    review: (ReviewType[])
  }

interface MessageType {
  postTime: string,
  sender:string,
  text: string,
}

const App = () => {
  const [user, setUser] = useState<string|null>('Admin');
  // const [user, setUser] = useState(null);
  const [message, setMessage] = useState<string|null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMobileOpen = (open: boolean) => {
    setMobileOpen(open);
  };

  // -------------------------------------------------------------------------------
  // state for Add
  const [addYear, setAddYear] = useState(2020);
  const [addChampionship, setAddChampionship] = useState('');
  const [addRace, setAddRace] = useState('');
  const [addTrack, setAddTrack] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [addMessage, setAddMessage] = useState('');

  const history = useHistory();

  function handleAddYear(year: number) {
    // console.log(year);
    setAddYear(year);
  }

  const handleAddChampionship = (championship: string) => {
    setAddChampionship(championship);
  };

  const handleAddRace = (raceName: string) => {
    setAddRace(raceName);
  };

  const handleAddTrack = (track: string) => {
    setAddTrack(track);
  };

  const handleAddLocation = (location: string) => {
    setAddLocation(location);
  };

  const handleAddMessage = (newAddMessage: string) => {
    setAddMessage(newAddMessage);
  };

  const resetAddFields = () => {
    setAddYear(2020);
    setAddChampionship('');
    setAddRace('');
    setAddTrack('');
    setAddLocation('');
  };
  // -------------------------------------------------------------------------------
  // state for Races
  const [races, setRaces] = useState<RaceType[]|null>([]);
  const [searchRaceyear, setsearchRaceYear] = useState<number|null>(null);
  const [searchRacechampionship, setsearchRaceChampionship] = useState<string|null>('');
  const [searchRaceraceName, setsearchRaceName] = useState<string|null>('');
  const [searchRacetrack, setsearchRaceTrack] = useState<string|null>('');
  const [searchRacelocation, setsearchRaceLocation] = useState<string|null>('');
  const [raceshowFilter, setRaceShowFilter] = useState(false);

  useEffect(() => {
    raceService.getAll().then((racesArray: RaceType[]) => setRaces(racesArray));
  }, []);

  const refreshRaces = () => {
    raceService.getAll().then((racesArray: RaceType[]) => setRaces(racesArray));
  };

  const handlesearchRaceYear = (year: number) => {
    setsearchRaceYear(year);
  };

  const handlesearchRaceChampionship = (championship: string) => {
    setsearchRaceChampionship(championship);
  };

  const handlesearchRaceName = (name: string) => {
    setsearchRaceName(name);
  };

  const handlesearchTrack = (track: string) => {
    setsearchRaceTrack(track);
  };

  const handlesearchLocation = (location: string) => {
    setsearchRaceLocation(location);
  };

  const handleRaces = (returnedRaces: RaceType[]) => {
    setRaces(returnedRaces);
  };

  const handleRaceShowFilter = (show: boolean) => {
    setRaceShowFilter(show);
  };

  // -------------------------------------------------------------------------------
  // state for race
  const [singleRace, setSingleRace] = useState<RaceType|null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [reviewsEditShow, setReviewsEditShow] = useState(false);
  const [reviewsEditShowId, setReviewsEditShowId] = useState(0);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteShowId, setDeleteShowId] = useState(0);
  // eslint-disable-next-line
  const [raceMessage, setRaceMessage] = useState('');
  const [nonExistant, setNonExistant] = useState(false);
  const [currentRaceId, setCurrentRaceId] = useState(0);

  useEffect(() => {
    if (singleRace != null) {
      if (singleRace.raceName) {
        setNonExistant(false);
      } else {
        setNonExistant(true);
      }
      if (typeof singleRace.raceName === 'undefined') {
        setNonExistant(true);
      }
    }
  }, [singleRace]);

  const handleSingleRace = (race: RaceType) => {
    setSingleRace(race);
  };
  const handleReviews = (review: ReviewType[]) => {
    setReviews(review);
  };
  const handleReviewsEditShow = (show: boolean) => {
    setReviewsEditShow(show);
  };
  const handleReviewsEditShowId = (idNo: number) => {
    setReviewsEditShowId(idNo);
  };
  const handleDeleteShow = (show: boolean) => {
    setDeleteShow(show);
  };
  const handleDeleteShowId = (idNo: number) => {
    setDeleteShowId(idNo);
  };
  const handleRaceMessage = (singleRaceMessage: string) => {
    setRaceMessage(singleRaceMessage);
  };
  // eslint-disable-next-line
  const handleNonExistant = (non: boolean) => {
    setNonExistant(non);
  };
  const handleCurrentRaceId = (idNo: number) => {
    setCurrentRaceId(idNo);
  };
  // -------------------------------------------------------------------------------
  // state for editraceform
  const [editraceformyear, seteditraceformYear] = useState(0);
  const [editraceformchampionship, seteditraceformChampionship] = useState('');
  const [editraceformraceName, seteditraceformRaceName] = useState('');
  const [editraceformtrack, seteditraceformTrack] = useState('');
  const [editraceformlocation, seteditraceformLocation] = useState('');
  const [editraceformmessage, seteditraceformMessage] = useState('');
  const [editraceformdeleteShow, seteditraceformDeleteShow] = useState(false);

  useEffect(() => {
    if (singleRace != null) {
      try {
        seteditraceformYear(singleRace.year);
        seteditraceformChampionship(singleRace.championship);
        seteditraceformRaceName(singleRace.raceName);
        seteditraceformTrack(singleRace.track);
        seteditraceformLocation(singleRace.location);
      } catch {
        console.log('no value');
      }
    }
  }, [singleRace]);

  const handleEditraceformyear = (year: number) => {
    seteditraceformYear(year);
  };
  const handlEditraceformchampionship = (c: string) => {
    seteditraceformChampionship(c);
  };
  const handleEditraceformraceName = (rn: string) => {
    seteditraceformRaceName(rn);
  };
  const handleEditraceformtrack = (t: string) => {
    seteditraceformTrack(t);
  };
  const handleEditraceformlocation = (l: string) => {
    seteditraceformLocation(l);
  };
  const handleEditraceformmessage = (m: string) => {
    seteditraceformMessage(m);
  };

  const handleeditraceformdeleteShow = (show: boolean) => {
    seteditraceformDeleteShow(show);
  };

  // -------------------------------------------------------------------------------
  // state for reviewrace
  const [reviewrating, setreviewRating] = useState(5);
  const [finalTranscriptState, setFinalTranscriptState] = useState('');
  const [reviewracemessage, setreviewraceMessage] = useState('');
  const [listening, setListening] = useState(false);
  const [transcriptToAdd, setTranscriptToAdd] = useState('');

  const handleFinalTranscriptChange = (transcript: string) => {
    setFinalTranscriptState(transcript);
  };

  const handlereviewRating = (rate: number) => {
    setreviewRating(rate);
  };

  const handleReviewRaceMessage = (m: string) => {
    setreviewraceMessage(m);
  };

  const handleListening = (listen: boolean) => {
    setListening(listen);
  };

  const handleTranscriptToAdd = (t: string) => {
    setTranscriptToAdd(t);
  };

  useEffect(() => {
    setFinalTranscriptState(finalTranscriptState.concat('\n \n', transcriptToAdd));
    // eslint-disable-next-line
  }, [transcriptToAdd]);

  // -------------------------------------------------------------------------------
  // state for editreviewform
  const [editReviewFormScore, seteditreviewformScore] = useState(5);
  const [editReviewFormText, seteditreviewformText] = useState('');
  const [editReviewFormMessage, seteditreviewformMessage] = useState('');
  const [currentReview, setCurrentReview] = useState<ReviewType|null>();

  const handleEditReviewFormScore = (score: number) => {
    seteditreviewformScore(score);
  };

  const handleEditReviewFormText = (t: string) => {
    seteditreviewformText(t);
  };

  const handleEditReviewFormMessage = (fm: string) => {
    seteditreviewformMessage(fm);
  };

  useEffect(() => {
    try {
      reviewService.getReview(reviewsEditShowId).then((review: ReviewType) => setCurrentReview(review));
    } catch {
      console.log('no value');
    }
  }, [reviewsEditShowId]);

  useEffect(() => {
    // if (singleRace != null) {
    if (currentReview != null) {
      try {
        seteditreviewformScore(currentReview.reviewScore);
        seteditreviewformText(currentReview.reviewText);
      } catch {
        console.log('novalue');
      }
    }
  }, [currentReview]);

  // -------------------------------------------------------------------------------
  // Chat state and function
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [newMessageNotification, setNewMessageNotification] = useState('');

  const handlemessages = (newMessages: MessageType) => {
    setMessages((messagesArray) => [...messagesArray, newMessages]);
  };

  const handlemessageToSend = (typedMessage: string) => {
    setInputMessage(typedMessage);
  };

  const [connection, setConnection] = useState<HubConnection>();
  // typescript
  // https://bilot.group/articles/modern-real-time-web-app-with-signalr/
  // const [hubConnection, setHubConnection] = useState<HubConnection>();

  function logError(err: any) {
    console.error('Error establishing connection', err);
  }

  async function newMessage(newChatMessage: any) {
    const { sender, text } = newChatMessage;
    const postTime = new Date().toLocaleString();
    handlemessages({
      postTime,
      sender,
      text,
    });
  }

  const apiBaseUrl = 'https://racereviewchatsignalr.azurewebsites.net';

  useEffect(() => {
    const createHubConnection = async () => {
      const connect = new HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/api`)
        .configureLogging(LogLevel.Information)
        .build();
      try {
        console.log('connecting...');
        await connect.start()
          .then((response) => {
            console.log('connection established', response);
          })
          .catch(logError);
      } catch (err) {
        console.log(err);
      }
      setConnection(connect);
    };
    createHubConnection();
  }, []); // can have state here to retry connection

  useEffect(() => {
    try {
      if (connection !== undefined && connection !== null) {
        connection.on('newMessage', newMessage);
      }
    } catch {
      console.log('no message');
    } // eslint-disable-next-line
  }, [connection]); // can have state here to retry connection

  const handlenewMessageNotification = (newNotification: string) => {
    setNewMessageNotification(newNotification);
  };

  // eslint-disable-next-line no-shadow
  const login = (user: string) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const logout = () => {
    // console.log('log out');
    setUser(null);
    setMobileOpen(false);
    setMessage('Logged out');
    setTimeout(() => {
      setMessage(null);
    }, 10000);
    history.push('/');
  };

  useEffect(() => {
    if (messages.length > 0) {
      handlenewMessageNotification(`New Message at:${messages[messages.length - 1].postTime}`);
    }
  }, [messages]); // can have state here to retry connection
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // -------------------------------------------------------------------------------------

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
      <Container>
        <div>
          {(message && (
          <Alert severity="success">
            {message}
          </Alert>
          )
          )}
        </div>
        <div>
          <AppBar position="static" style={{ background: '#5f6363' }}>
            <Toolbar>
              <Button
                style={{
                  backgroundColor: '#DEE3E3',
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#FF0000',
                  borderRadius: 0,
                  width: 90,
                  height: 70,
                }}
                color="primary"
                component={Link}
                to="/"
              >
                home
              </Button>
              <Button
                style={{
                  backgroundColor: '#FF0000',
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#DEE3E3',
                  borderRadius: 0,
                  width: 90,
                  height: 70,
                }}
                component={Link}
                to="/Races"
              >
                Races
              </Button>
              <Button
                style={{
                  backgroundColor: '#DEE3E3',
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#FF0000',
                  borderRadius: 0,
                  width: 90,
                  height: 70,
                }}
                component={Link}
                to="/Add"
              >
                Add
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/Chat"
                style={{
                  backgroundColor: '#FF0000',
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#DEE3E3',
                  borderRadius: 0,
                  width: 90,
                  height: 70,
                }}
              >
                Chat
              </Button>

              <Grid container alignItems="flex-start" justify="flex-end" direction="row" style={{ color: 'red', fontSize: 22, width: 100 }}>
                {user
                  ? (
                    <div>
                      <Button
                        color="inherit"
                        onClick={logout}
                        style={{
                          backgroundColor: '#DEE3E3',
                          padding: '12px 18px',
                          fontSize: '12px',
                          color: '#FF0000',
                          borderRadius: 0,
                          width: 90,
                          height: 70,
                        }}
                      >
                        {user }
                        <br />
                        Logout
                      </Button>
                    </div>
                  )
                  : (
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      style={{
                        backgroundColor: '#DEE3E3',
                        padding: '12px 18px',
                        fontSize: '16px',
                        color: '#FF0000',
                        borderRadius: 0,
                        width: 90,
                        height: 70,
                      }}
                    >
                      login
                    </Button>
                  )}
              </Grid>
              <Grid container alignItems="flex-start" justify="flex-end" direction="row" style={{ color: 'red', fontFamily: 'Iceberg', fontSize: 22 }}>
                <img alt="R" src={r} height="50" width="50" />
                ace
                <br />
                &nbsp;
                eview
                &nbsp;
              </Grid>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/Races/:id">
              <Race
                user={user}
                singleRace={singleRace}
                setSingleRace={handleSingleRace}
                reviews={reviews}
                setReviews={handleReviews}
                reviewsEditShow={reviewsEditShow}
                setReviewsEditShow={handleReviewsEditShow}
                reviewsEditShowId={reviewsEditShowId}
                setReviewsEditShowId={handleReviewsEditShowId}
                deleteShow={deleteShow}
                setDeleteShow={handleDeleteShow}
                deleteShowId={deleteShowId}
                setDeleteShowId={handleDeleteShowId}
                nonExistant={nonExistant}
                setMessage={handleRaceMessage}
                currentRaceId={currentRaceId}
                setCurrentRaceId={handleCurrentRaceId}

                setTranscriptToAdd={handleTranscriptToAdd}
                finalTranscriptState={finalTranscriptState}
                setFinalTranscriptState={handleFinalTranscriptChange}
                racereviewrating={reviewrating}
                setracereviewRating={handlereviewRating}
                racereviewmessage={reviewracemessage}
                setracereviewMessage={handleReviewRaceMessage}
                listening={listening}
                setListening={handleListening}

                editraceformyear={editraceformyear}
                editraceformchampionship={editraceformchampionship}
                editraceformraceName={editraceformraceName}
                editraceformtrack={editraceformtrack}
                editraceformlocation={editraceformlocation}
                handleEditraceformyear={handleEditraceformyear}
                handlEditraceformchampionship={handlEditraceformchampionship}
                handleEditraceformraceName={handleEditraceformraceName}
                handleEditraceformtrack={handleEditraceformtrack}
                handleEditraceformlocation={handleEditraceformlocation}
                editraceformmessage={editraceformmessage}
                handleEditraceformmessage={handleEditraceformmessage}
                editraceformdeleteShow={editraceformdeleteShow}
                handleeditraceformdeleteShow={handleeditraceformdeleteShow}

                editReviewFormText={editReviewFormText}
                handleEditReviewFormText={handleEditReviewFormText}
                editReviewFormScore={editReviewFormScore}
                handleEditReviewFormScore={handleEditReviewFormScore}
                editReviewFormMessage={editReviewFormMessage}
                handleEditReviewFormMessage={handleEditReviewFormMessage}
              />
            </Route>
            <Route path="/Races">
              <Races
                year={searchRaceyear}
                raceName={searchRaceraceName}
                championship={searchRacechampionship}
                track={searchRacetrack}
                location={searchRacelocation}
                setRaceYear={handlesearchRaceYear}
                setRaceChampionship={handlesearchRaceChampionship}
                setRaceName={handlesearchRaceName}
                setRaceTrack={handlesearchTrack}
                setRaceLocation={handlesearchLocation}
                races={races}
                setRaces={handleRaces}
                showFilter={raceshowFilter}
                setShowFilter={handleRaceShowFilter}
                refreshRaces={refreshRaces}
              />
            </Route>
            <Route path="/Add">
              <Add
                    // eslint-disable-next-line react/jsx-props-no-spreading
                user={user}
                year={addYear}
                championship={addChampionship}
                race={addRace}
                track={addTrack}
                enteredlocation={addLocation}
                message={addMessage}
                handleYear={handleAddYear}
                handleChampionship={handleAddChampionship}
                handleRace={handleAddRace}
                handleTrack={handleAddTrack}
                handleLocation={handleAddLocation}
                handleMessage={handleAddMessage}
                resetAddFields={resetAddFields}
              />
            </Route>
            <Route path="/login">
              <Login onLogin={login} loggedInUser={user} />
            </Route>
            <Route
              exact
              path="/Chat"
              render={
                () => (
                  <Chat
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    chatMessages={messages}
                    inputMessage={inputMessage}
                    handleInputMessage={handlemessageToSend}
                    newMessageNotification={newMessageNotification}
                    user={user}
                  />
                )
              }
            />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <div>
            <br />
            <em>Race Review</em>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div style={{ width: windowWidth * 0.8, tableLayout: 'auto' }}>
      <Container>
        <div>
          {(message && (
          <Alert severity="success">
            {message}
          </Alert>
          )
          )}
        </div>
        <div>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ background: '#5f6363' }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row" style={{ color: 'red', fontFamily: 'Iceberg', fontSize: 22 }}>
                  <img alt="R" src={r} height="50" width="50" />
                  ace
                  <br />
                  &nbsp;
                  eview
                  &nbsp;
                </Grid>
              </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
              <Hidden smUp implementation="css">
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true,
                  }}
                >
                  <Sidedrawer
                    windowWidth={windowWidth}
                    user={user}
                    logout={logout}
                    handleMobileOpen={handleMobileOpen}
                  />
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  <Sidedrawer
                    windowWidth={windowWidth}
                    user={user}
                    logout={logout}
                    handleMobileOpen={handleMobileOpen}
                  />
                </Drawer>
              </Hidden>
            </nav>

            <main className={classes.content}>
              <div className={classes.toolbar} />

              <Switch>
                <Route path="/Races/:id">
                  <Race
                    user={user}
                    singleRace={singleRace}
                    setSingleRace={handleSingleRace}
                    reviews={reviews}
                    setReviews={handleReviews}
                    reviewsEditShow={reviewsEditShow}
                    setReviewsEditShow={handleReviewsEditShow}
                    reviewsEditShowId={reviewsEditShowId}
                    setReviewsEditShowId={handleReviewsEditShowId}
                    deleteShow={deleteShow}
                    setDeleteShow={handleDeleteShow}
                    deleteShowId={deleteShowId}
                    setDeleteShowId={handleDeleteShowId}
                    nonExistant={nonExistant}
                    setMessage={handleRaceMessage}
                    currentRaceId={currentRaceId}
                    setCurrentRaceId={handleCurrentRaceId}

                    setTranscriptToAdd={handleTranscriptToAdd}
                    finalTranscriptState={finalTranscriptState}
                    setFinalTranscriptState={handleFinalTranscriptChange}
                    racereviewrating={reviewrating}
                    setracereviewRating={handlereviewRating}
                    racereviewmessage={reviewracemessage}
                    setracereviewMessage={handleReviewRaceMessage}
                    listening={listening}
                    setListening={handleListening}

                    editraceformyear={editraceformyear}
                    editraceformchampionship={editraceformchampionship}
                    editraceformraceName={editraceformraceName}
                    editraceformtrack={editraceformtrack}
                    editraceformlocation={editraceformlocation}
                    handleEditraceformyear={handleEditraceformyear}
                    handlEditraceformchampionship={handlEditraceformchampionship}
                    handleEditraceformraceName={handleEditraceformraceName}
                    handleEditraceformtrack={handleEditraceformtrack}
                    handleEditraceformlocation={handleEditraceformlocation}
                    editraceformmessage={editraceformmessage}
                    handleEditraceformmessage={handleEditraceformmessage}
                    editraceformdeleteShow={editraceformdeleteShow}
                    handleeditraceformdeleteShow={handleeditraceformdeleteShow}

                    editReviewFormText={editReviewFormText}
                    handleEditReviewFormText={handleEditReviewFormText}
                    editReviewFormScore={editReviewFormScore}
                    handleEditReviewFormScore={handleEditReviewFormScore}
                    editReviewFormMessage={editReviewFormMessage}
                    handleEditReviewFormMessage={handleEditReviewFormMessage}
                  />
                </Route>
                <Route path="/Races">
                  <Races
                    year={searchRaceyear}
                    raceName={searchRaceraceName}
                    championship={searchRacechampionship}
                    track={searchRacetrack}
                    location={searchRacelocation}
                    setRaceYear={handlesearchRaceYear}
                    setRaceChampionship={handlesearchRaceChampionship}
                    setRaceName={handlesearchRaceName}
                    setRaceTrack={handlesearchTrack}
                    setRaceLocation={handlesearchLocation}
                    races={races}
                    setRaces={handleRaces}
                    showFilter={raceshowFilter}
                    setShowFilter={handleRaceShowFilter}
                    refreshRaces={refreshRaces}
                  />
                </Route>
                <Route path="/Add">
                  <Add
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    user={user}
                    year={addYear}
                    championship={addChampionship}
                    race={addRace}
                    track={addTrack}
                    enteredlocation={addLocation}
                    message={addMessage}
                    handleYear={handleAddYear}
                    handleChampionship={handleAddChampionship}
                    handleRace={handleAddRace}
                    handleTrack={handleAddTrack}
                    handleLocation={handleAddLocation}
                    handleMessage={handleAddMessage}
                    resetAddFields={resetAddFields}
                  />
                </Route>
                <Route path="/login">
                  <Login onLogin={login} loggedInUser={user} />
                </Route>
                <Route
                  exact
                  path="/Chat"
                  render={
                () => (
                  <Chat
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    chatMessages={messages}
                    inputMessage={inputMessage}
                    handleInputMessage={handlemessageToSend}
                    newMessageNotification={newMessageNotification}
                    user={user}
                  />
                )
              }
                />
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div>
          <br />
          <div>
            <br />
            <br />
            <em>Race Review</em>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;