import React from 'react';
import styles from './Activities.scss';
import classNames from 'classnames/bind';
import CardContainer from '../../components/CardContainer/CardContainer.jsx';

const style = classNames.bind(styles);

const Activities = () => {
  return (
    <div className={style('activities')}>
      <p>Hej! Här kommer dagens 3 förslag på vad du kan göra för att komma upp i dina 10 000 steg Dags att röra på sig! 💪</p>
      <CardContainer />
    </div>
  );
};

export default Activities;
