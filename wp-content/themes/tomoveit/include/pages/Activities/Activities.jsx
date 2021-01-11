import React, { useEffect } from 'react';
import styles from './Activities.scss';
import classNames from 'classnames/bind';
import CardContainer from '../../components/CardContainer/CardContainer.jsx';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button.jsx';
import axios from 'axios';

const style = classNames.bind(styles);

const Activities = () => {
  const activities = useSelector(state => state.app.activities);
  const texts = useSelector(state => state.app.texts);
  const runningActivity = useSelector(state => state.app.runningActivity);
  const history = useHistory();

  const pin = useSelector(state => state.app.pin);

  const handleClick = () => {
    axios.get('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/randomize')
      .then((response) => {
      }, (error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (runningActivity) {
      history.push({ pathname: '/runningActivity' });
    }
  }, []);

  return (
    <div className={style('activities')}>
      <div className={style('activities__text')}>
        {activities.length === 3 && <p>{texts.textsActivities1}</p>}
        {activities.length === 2 && <p>{texts.textsActivities2}</p>}
        {activities.length === 1 && <p>{texts.textsActivities3}</p>}
      </div>
      { activities.length === 0 &&
        <div className={style('activities__celebrate')}>
          <h3>{texts.textsActivitiesDone1}<br/> {texts.textsActivitiesDone2}</h3>
          <img src="https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/tomoveit-celebrate.gif" alt="tomoveit-celebrate"/>
        </div>
      }
      <CardContainer />

      <div className={style('activities__bottom')}>
        { (pin === '2020') &&
          <div className={style('activities__button')}>
            <Button to={'/introduction'} text={'SLUMPA NYA AKTIVITETER'} handleClick={handleClick}/>
          </div>
        }
        <span>{texts.textsActivitiesBottom}</span>
      </div>
    </div>
  );
};

export default Activities;
