import React, { useState, useEffect } from 'react';
import Container from '../../components/Container/Container.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [pin, setPin] = useState('');
  const [logedIn, setLogedIn] = useState(false);

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  useEffect(() => {
    if (logedIn) {
      history.push('/welcome');
    }
  }, [logedIn]);

  const handleClick = (e) => {
    axios.post('https://tomoveit.hbgtest.se//wp-json/TomoveitRestApi/v1/login', {
      pin: pin,
    },
    ).then((response) => {
      if (response.data === 'ok') {
        setLogedIn(true);
      }
    }, (error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <Container>
        <p>Skriv in din PIN-kod:</p>
        <BottomContainer>
          <Input handleChange={handleChange} />
          <Button handleClick={handleClick} to={'/welcome'} text={'LOGGA IN'}/>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Login;
