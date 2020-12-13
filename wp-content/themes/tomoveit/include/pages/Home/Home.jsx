import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.scss';

import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';

const style = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <Container>
        <p> Hej kompis! 👋 </p>
        <p>
          Flash Unicorn, men du kan kalla mig Flashy Flash, och jag kommer att hänga med dig genom dina nya äventyr.
        </p>
        <BottomContainer>
          <Button to={'/introduction'} text={'OKEJ'} />
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Home;
