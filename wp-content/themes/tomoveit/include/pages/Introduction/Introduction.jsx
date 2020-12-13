import React from 'react';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';

const Introduction = () => {
  return (
    <Container>
      <p>Jag har följt dig ett tag via ditt armband. Du har rört dig bra. Snyggt jobbat! 💪🏻</p>
      <p>Nu ska jag även följa dig här. Och här kommer du att få välja en ny utmaning att prova varje dag. Kul va? Och jag kommer fråga dig varje dag hur gårdagens utmaning har gått för dig. </p>
      <p>Ska vi köra igång?</p>
      <BottomContainer>
        <Button to={'/activities'} text={'YES!'}/>
      </BottomContainer>
    </Container>
  );
};

export default Introduction;
