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
  const pin = useSelector(state => state.app.pin);

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
        <h3> Hej kompis! 👋</h3>
        <br/>
        <h3>
          Flash Unicorn, men du kan kalla mig <span className={ style('home__blue')}>Flashy Flash</span>, och jag kommer att hänga med dig genom dina nya äventyr.
        </h3>
        <BottomContainer>
          <div className={ style('home__buttons')}>
            { (pin === '1234') && <Button to={'/introduction'} text={'SLUMPA NYA AKTIVITETER'} handleClick={handleClick} /> }
            <Button to={'/introduction'} text={'OKEJ'} />
          </div>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Home;
