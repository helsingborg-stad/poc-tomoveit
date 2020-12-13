import React from 'react';
import Container from '../../components/Container/Container.jsx';
import CardContainer from '../../components/CardContainer/CardContainer.jsx';

const Activities = () => {
  return (
    <div>
      <Container>
        <p>Hej! Här kommer dagens 3 förslag på vad du kan göra för att komma upp i dina 10 000 steg Dags att röra på sig! 💪</p>
        <CardContainer />
      </Container>
    </div>
  );
};

export default Activities;
