import React from 'react';
import styles from './Activities.scss';
import classNames from 'classnames/bind';
import CardContainer from '../../components/CardContainer/CardContainer.jsx';

import { useSelector } from 'react-redux';

const style = classNames.bind(styles);

const Activities = () => {
  const activities = useSelector(state => state.app.activities);

  return (
    <div className={style('activities')}>
      <div className={style('activities__text')}>
        {activities.length !== 0 && <p>Hej! Här kommer dagens 3 förslag på vad du kan göra för att komma upp i dina 10 000 steg Dags att röra på sig! 💪</p>}
      </div>
      { activities.length === 0 && <h3>Boom! 🎉💪️👏 Du har provat dig igenom alla aktiviteterna idag. Men imorgon kommer det 3 nya! ⚡️</h3> }
      <CardContainer />
    </div>
  );
};

export default Activities;
