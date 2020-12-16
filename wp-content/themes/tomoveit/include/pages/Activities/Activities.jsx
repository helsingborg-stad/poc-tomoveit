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
      { activities.length === 0 &&
        <div className={style('activities__celebrate')}>
          <h3>Boom! 🎉💪️👏<br/>Du har provat dig igenom alla aktiviteterna idag.<br/>Men imorgon kommer det 3 nya! ⚡️</h3>
          <img src="https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/tomoveit-celebrate.gif" alt="tomoveit-celebrate"/>
        </div>
      }
      <CardContainer />
    </div>
  );
};

export default Activities;
