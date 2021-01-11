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
  const texts = useSelector(state => state.app.texts);
  const admin = useSelector(state => state.app.admin);

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
        <h3> {texts.textWelcome1}</h3>
        <br/>
        <h3>
          {texts.textWelcome2} <span className={ style('home__blue')}>{texts.textWelcomeBlue}</span> {texts.textWelcome3}
        </h3>
        <BottomContainer>
          <div className={ style('home__buttons')}>
            { admin && <Button to={'/introduction'} text={'SLUMPA NYA AKTIVITETER'} handleClick={handleClick} /> }
            <Button to={'/introduction'} text={'OKEJ'} />
          </div>
        </BottomContainer>
      </Container>
    </div>
  );
};

export default Home;
