import React from 'react';
import classNames from 'classnames/bind';
import styles from './CurrentActivity.scss';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button/Button.jsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { runningActivity, selectCard, deleteActivity } from '../../actions/app';

const style = classNames.bind(styles);

const CurrentActivity = () => {
  const runningActivityData = useSelector(state => state.app.runningActivity[0]);
  const titleColor = runningActivityData.group ? 'card-current__text--blue' : 'card-current__text--green';
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickOk = () => {
    axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/setDoneActivity', {
      postId: runningActivityData.postId,
    },
    ).then((response) => {
      console.log(runningActivityData.postId);
      dispatch(deleteActivity(runningActivityData.postId));
      dispatch(runningActivity({}));
      dispatch(selectCard({}));
    }, (error) => {
      console.log(error);
    });
    history.replace('/activities');
  };

  return (
    <div className={ style('current-activity')} >
      <div className={ style('current-activity__title')}>
        <h1>Du har valt en aktivitet</h1>
        <p>Försök göra aktiviteten under dagen. Glöm inte att ha skoj 😄</p>
      </div>
      <div className={ style('current-activity__warp')}>
        <div key={runningActivityData.title} className={style('card-current')}>
          <div className={style('card-current_image-container')}>
            { !runningActivityData.group &&
            <svg className={style('card-current__svg')}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-single'}/>
            </svg>
            }
            { runningActivityData.group &&
            <svg className={style('card-current__svg')}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-group'}/>
            </svg>
            }
            <img className={style('card-current__image')} src={runningActivityData.image} alt={'Alt'} />
          </div>
          <div className={style('card-current__text')}>
            <p className={style(titleColor)}>{runningActivityData.title}</p>
            <p>{runningActivityData.time}</p>
          </div>
        </div>
      </div>

      <div className={ style('current-activity__description')}>
        <p className={ style('current-activity__text-title')}>Beskrivning</p>
        <p>{runningActivityData.description}</p>
        <p className={ style('current-activity__text-title')}>Vad du behöver</p>
        <p>{runningActivityData.needed}</p>
        <p className={ style('current-activity__text-title')}>Antal</p>
        <p>{runningActivityData.numbers}</p>
        <p className={ style('current-activity__text-title')}>Instruktioner</p>
        <p>{runningActivityData.instruction}</p>
      </div>
      <div className={ style('current-activity__button')}>
        <Button handleClick={handleClickOk} to={'/welcome'} text={'JAG KLARA DET!'}/>
        <Button handleClick={handleClickOk} whiteColor={true} to={'/welcome'} text={'JAG ÅNGRA MIG!'}/>
      </div>
    </div>
  );
};

export default CurrentActivity;
