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
        {activities.length !== 0 && <p>Hej! Här kommer dagens 3 förslag på vad du kan göra för att komma upp i dina 10 000 steg.<br/>Dags att röra på sig! 💪</p>}
      </div>
      { activities.length === 0 &&
        <div className={style('activities__celebrate')}>
          <h3>Boom! 🎉💪️👏<br/>Du har provat dig igenom alla aktiviteterna idag.<br/>Men imorgon kommer det 3 nya! ⚡️</h3>
          <img src="https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/tomoveit-celebrate.gif" alt="tomoveit-celebrate"/>
        </div>
      }
      <CardContainer />

      <div className={style('activities__bottom')}>
        { (pin === '1234') &&
          <div className={style('activities__button')}>
            <Button to={'/introduction'} text={'SLUMPA NYA AKTIVITETER'} handleClick={handleClick}/>
          </div>
        }
        <span>PSSST! Om du orkar kan du göra alla 3(!)</span>
      </div>
    </div>
  );
};

export default Activities;
