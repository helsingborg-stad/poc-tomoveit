import React from 'react';
import BottomContainer from '../../components/Presentational/BottomContainer/BottomContainer.jsx';
import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container.jsx';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { replaceLineBreaksWithHTML } from '../../util/util';

const Introduction = () => {
  const history = useHistory();
  const runningActivity = useSelector(state => state.app.runningActivity);
  const texts = useSelector(state => state.app.texts);
  const handleClick = () => {
    if (runningActivity) {
      history.push({ pathname: '/runningActivity' });
    } else {
      history.push({ pathname: '/activities' });
    }
  };

  return (
    <Container>
      <h3>{replaceLineBreaksWithHTML(texts.textIntroduction1)}</h3>
      <br/>
      <h3>{replaceLineBreaksWithHTML(texts.textIntroduction2)}</h3>
      <br/>
      <h3>{replaceLineBreaksWithHTML(texts.textIntroduction3)}</h3>
      <BottomContainer>
        <Button to={'/activities'} text={'YES!'} handleClick={handleClick}/>
      </BottomContainer>
    </Container>
  );
};

export default Introduction;
