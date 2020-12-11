import React from 'react';
import Container from '../../components/Container/Container.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';

const Login = () => {
  return (
    <div>
      <Container>
        <p>Skriv in din PIN-kod:</p>
        <BottomContainer>
          <Input/>
          <Button to={'#/'} text={'LOGGA IN'}/>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Login;
