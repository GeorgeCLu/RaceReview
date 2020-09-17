/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import {
  useHistory,
} from 'react-router-dom';
import './Login.css';
// import container from './Styles';
import CustomTextField from './CustomTextField';

interface LoginProps {
  onLogin: ((user: string) => void),
  loggedInUser : string|null;
}

const Login = (props: LoginProps) => {
  const { onLogin, loggedInUser } = props;
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const [IsFormValid, setIsFormValid] = React.useState(false);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  /*
  <div>
    <CustomTextField
    id="outlined-basic"
    label="Password"
    className="test"
    variant="outlined"
    type="password"
    onChange={handlePassword}
    value={password}
    />
   </div>
  */

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // props.onLogin(user)
    onLogin(user);
    history.push('/');
  };

  useEffect(() => {
    if (
      user.length >= 1
      && user.length <= 25
      && ((user !== 'admin' && user !== 'Admin' && user !== 'ADMIN')|| ((user === 'admin' || user === 'Admin' || user === 'ADMIN') && password === 'password'))
      // && password.length >= 1
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [user, password]);

  if (loggedInUser) {
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
          <br />
          <div>
            {`${loggedInUser} logged in`}
          </div>
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h2>Login</h2>
            <br />
            No password currently required.
          </Grid>
          <form onSubmit={onSubmit}>
            <br />
            <div>
              <CustomTextField
                id="outlined-basic"
                label="Username - Max 25 char"
                className="test"
                variant="outlined"
                onChange={handleUser}
                value={user}
              />
            </div>
            <br />
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <div>
                <br/ >
                {((user === 'admin' || user === 'Admin' || user === 'ADMIN') 
                  && (<div>
                  <CustomTextField
                    id="outlined-basic"
                    label="Password"
                    className="test"
                    variant="outlined"
                    type="password"
                    onChange={handlePassword}
                    value={password}
                  />
                </div>))}
                <br />
              </div>
              <div>
                {IsFormValid && (
                <Button
                  style={{
                    borderRadius: 1000,
                    backgroundColor: '#5f6363',
                    padding: '15px 30px',
                    fontSize: '15px',
                    color: '#ebe6e6',
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!IsFormValid}
                >
                  login
                </Button>
                )}
                <br />
              </div>
            </Grid>
          </form>
          <br />
        </div>
      </Grid>
    </div>
  );
};

export default Login;
