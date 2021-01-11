import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container/Container.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Login/Login.scss';
import { addActivities, runningActivity, setPin, setData, setTexts } from '../../actions/app';

const style = classNames.bind(styles);

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const texts = useSelector(state => state.app.texts);

  const [pin, setPinCode] = useState('');
  const [logedIn, setLogedIn] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const [awaitActivities, setAwaitActivities] = useState(false);
  const [awaitRunningActivities, setAwaitRunningActivities] = useState(false);
  const [awaitAuth, setAwaitAuth] = useState(false);
  const [awaitData, setAwaitData] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPinCode(e.target.value);
  };

  useEffect(() => {
    axios.get('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/getTexts')
      .then((response) => {
        dispatch(setTexts(response.data));
        console.log('ok');
      }, (error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (awaitActivities && awaitRunningActivities && awaitAuth && awaitData) {
      setLoading(false);
      if (firstLogin) history.push('/welcome');
      else history.push('/activities');
    }
  }, [awaitActivities, awaitRunningActivities, awaitAuth, awaitData]);

  useEffect(() => {
    if (logedIn) {
      dispatch(setPin(pin));
      axios.get('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/getTexts')
        .then((response) => {
          dispatch(setTexts(response.data));
        }, (error) => {
          console.log(error);
        });
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
      if (pin === '2020') {
        axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/adminData', {
          pin: pin,
        },
        ).then((response) => {
          dispatch(setData(response.data));
          setAwaitData(true);
        }, (error) => {
          console.log(error);
        });
      } else {
        axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/data', {
          pin: pin,
        },
        ).then((response) => {
          dispatch(setData(response.data));
          setAwaitData(true);
        }, (error) => {
          console.log(error);
        });
      }
    }
  }, [logedIn]);

  const handleClick = (e) => {
    e.preventDefault();
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
    <div className={ style('login')}>
      <Container>
        <h3>Skriv in din PIN-kod:</h3>
        {errorText && <div className={ style('login__error')}><h3>😩</h3><h3>Nånting funkar inte just nu. Prova ladda om sidan.</h3></div>}
        <BottomContainer>
          <form onSubmit={handleClick} className={ style('login__form')}>
            <Input handleChange={handleChange} />
            <Button type='submit' loading={loading} to={'/welcome'} text={'LOGGA IN'}/>
          </form>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Login;
