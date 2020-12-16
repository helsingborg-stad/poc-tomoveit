import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.scss';

import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';

const style = classNames.bind(styles);

const Home = () => {
  const pin = useSelector(state => state.pin);

  const handleClick = () => {
    axios.get('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/randomize')
      .then((response) => {
      }, (error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <p> Hej kompis! 👋 </p>
        <p>
          Flash Unicorn, men du kan kalla mig Flashy Flash, och jag kommer att hänga med dig genom dina nya äventyr.
        </p>
        <BottomContainer>
          <div className={ style('home__buttons')}>
            <Button to={'/introduction'} text={'SLUMPA NYA AKTIVITETER'} handleClick={handleClick} />
            <Button to={'/introduction'} text={'OKEJ'} />
          </div>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Home;
