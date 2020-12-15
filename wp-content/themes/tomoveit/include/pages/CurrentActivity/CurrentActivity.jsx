import React from 'react';
import classNames from 'classnames/bind';
import styles from './CurrentActivity.scss';
import { useSelector } from 'react-redux';

const style = classNames.bind(styles);

const CurrentActivity = () => {
  const runningActivity = useSelector(state => state.app.runningActivity[0]);
  const titleColor = runningActivity.group ? 'card-current__text--blue' : 'card-current__text--green';
  return (
    <div className={ style('current-activity')} >
      <div className={ style('current-activity__title')}>
        <h1>Du har valt en aktivitet</h1>
        <p>Försök göra aktiviteten under dagen. Glöm inte att ha skoj 😄</p>
      </div>
      <div className={ style('current-activity__warp')}>
        <div key={runningActivity.title} className={style('card-current')}>
          <div className={style('card-current_image-container')}>
            { !runningActivity.group &&
            <svg className={style('card-current__svg')}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-single'}/>
            </svg>
            }
            { runningActivity.group &&
            <svg className={style('card-current__svg')}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-group'}/>
            </svg>
            }
            <img className={style('card-current__image')} src={runningActivity.image} alt={'Alt'} />
          </div>
          <div className={style('card-current__text')}>
            <p className={style(titleColor)}>{runningActivity.title}</p>
            <p>{runningActivity.time}</p>
          </div>
        </div>
      </div>

      <div className={ style('current-activity__description')}>
        <p className={ style('current-activity__text-title')}>Beskrivning</p>
        <p>{runningActivity.description}</p>
        <p className={ style('current-activity__text-title')}>Vad du behöver</p>
        <p>{runningActivity.needed}</p>
        <p className={ style('current-activity__text-title')}>Antal</p>
        <p>{runningActivity.numbers}</p>
        <p className={ style('current-activity__text-title')}>Instruktioner</p>
        <p>{runningActivity.instruction}</p>
      </div>
    </div>
  );
};

export default CurrentActivity;
