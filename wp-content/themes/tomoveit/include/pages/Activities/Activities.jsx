import React, { useEffect } from 'react';
import styles from './Activities.scss';
import classNames from 'classnames/bind';
import CardContainer from '../../components/CardContainer/CardContainer.jsx';
import RoundButton from '../../components/RoundButton/RoundButton.jsx';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button.jsx';
import axios from 'axios';
import { replaceLineBreaksWithHTML } from '../../util/util';

const style = classNames.bind(styles);

const Activities = () => {
  const activities = useSelector(state => state.app.activities);
  const texts = useSelector(state => state.app.texts);
  const runningActivity = useSelector(state => state.app.runningActivity);
  const history = useHistory();

  const admin = useSelector(state => state.app.admin);

  const handleClick = () => {
    axios.get('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/randomize')
      .then((response) => {
      }, (error) => {
        console.log(error);
      });
  };

  const handleClickResetIntro = () => {
    axios.get('http://tomoveit.test/wp-json/TomoveitRestApi/v1/resetIntroduction')
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
        {activities.length === 3 && <p>{replaceLineBreaksWithHTML(texts.textsActivities1)}</p>}
        {activities.length === 2 && <p>{replaceLineBreaksWithHTML(texts.textsActivities2)}</p>}
        {activities.length === 1 && <p>{replaceLineBreaksWithHTML(texts.textsActivities3)}</p>}
      </div>
      { activities.length === 0 &&
        <div className={style('activities__celebrate')}>
          <h3>{replaceLineBreaksWithHTML(texts.textsActivitiesDone1)}<br/> {replaceLineBreaksWithHTML(texts.textsActivitiesDone2)}</h3>
          <img src="https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/tomoveit-celebrate.gif" alt="tomoveit-celebrate"/>
        </div>
      }
      <CardContainer />

      <div className={style('activities__bottom')}>
        { admin &&
          <>
            <div className={style('activities__button-container')}>
              <div className={style('activities__button')}>
                <RoundButton handleClick={handleClick}/>
              </div>
              <div className={style('activities__button')}>
                <Button whiteColor={true} to={'/introduction'} text={'AKTIVERA INTRO'} handleClick={handleClickResetIntro}/>
              </div>
            </div>
          </>
        }
        { !admin && <span>{replaceLineBreaksWithHTML(texts.textsActivitiesBottom)}</span> }
      </div>
    </div>
  );
};

export default Activities;
