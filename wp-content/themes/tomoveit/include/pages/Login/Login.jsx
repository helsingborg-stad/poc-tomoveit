import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container/Container.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Login/Login.scss';
import { addActivities, runningActivity, setPin, setData } from '../../actions/app';

const style = classNames.bind(styles);

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [pin, setPinCode] = useState('');
  const [logedIn, setLogedIn] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const [awaitActivities, setAwaitActivities] = useState(false);
  const [awaitRunningActivities, setAwaitRunningActivities] = useState(false);
  const [awaitAuth, setAwaitAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPinCode(e.target.value);
  };

  useEffect(() => {
    if (awaitActivities && awaitRunningActivities && awaitAuth) {
      setLoading(false);
      if (firstLogin) history.push('/welcome');
      else history.push('/activities');
    }
  }, [awaitActivities, awaitRunningActivities, awaitAuth]);

  useEffect(() => {
    if (logedIn) {
      dispatch(setPin(pin));
      axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/activities', {
        pin: pin,
      },
      ).then((response) => {
        dispatch(addActivities(response.data));
        setAwaitActivities(true);
      }, (error) => {
        console.log(error);
      });

      axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/getRunningActivity', {
        pin: pin,
      },
      ).then((response) => {
        dispatch(runningActivity(response.data));
        setAwaitRunningActivities(true);
      }, (error) => {
        console.log(error);
      });

      axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/data', {
        pin: pin,
      },
      ).then((response) => {
        dispatch(setData(response.data));
      }, (error) => {
        console.log(error);
      });
    }
  }, [logedIn]);

  const handleClick = (e) => {
    setLoading(true);
    axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/login', {
      pin: pin,
    },
    ).then((response) => {
      if (response.data === '1') {
        setFirstLogin(true);
        setLogedIn(true);
      } else if (response.data === '0') {
        setFirstLogin(false);
        setLogedIn(true);
      } else {
        setLoading(false);
        setErrorText(true);
      }
      setAwaitAuth(true);
    }, (error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <Container>
        <h3>Skriv in din PIN-kod:</h3>
        {errorText && <div className={ style('login__error')}><h3>😩</h3><h3>Nånting funkar inte just nu. Prova ladda om sidan.</h3></div>}
        <BottomContainer>
          <Input handleChange={handleChange} />
          <Button loading={loading} handleClick={handleClick} to={'/welcome'} text={'LOGGA IN'}/>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Login;
