import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.scss';

import Avatar from '../../components/Avatar/Avatar.jsx';
import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';

const style = classNames.bind(styles);

const Home = () => {
  const test = '#/login';
  return (
    <Container>
      <div className={ style('home')}>
        <Avatar/>
        <p> Hej kompis! 👋 </p>
        <p>
          Flash Unicorn, men du kan kalla mig Flashy Flash, och jag kommer att hänga med dig genom dina nya äventyr.
        </p>
        <Button to={'#/login'} text={'OKEJ'} />
      </div>
    </Container>
  );
};

export default Home;
