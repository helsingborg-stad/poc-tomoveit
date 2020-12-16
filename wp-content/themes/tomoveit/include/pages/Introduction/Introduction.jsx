import React from 'react';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Introduction = () => {
  const history = useHistory();
  const runningActivity = useSelector(state => state.app.runningActivity);
  const handleClick = () => {
    if (runningActivity) {
      console.log('runningActivity');
      history.push({ pathname: '/runningActivity' });
    } else {
      console.log('/activities');
      history.push({ pathname: '/activities' });
    }
  };

  return (
    <Container>
      <h3>Jag har följt dig ett tag via ditt armband. Du har rört dig bra. Snyggt jobbat! 💪🏻</h3>
      <br/>
      <h3>Nu ska jag även följa dig här. Och här kommer du att få välja en ny utmaning att prova varje dag. Kul va? Och jag kommer fråga dig varje dag hur gårdagens utmaning har gått för dig. </h3>
      <br/>
      <h3>Ska vi köra igång?</h3>
      <BottomContainer>
        <Button to={'/activities'} text={'YES!'} handleClick={handleClick}/>
      </BottomContainer>
    </Container>
  );
};

export default Introduction;
