import React from 'react';
import classNames from 'classnames/bind';
import styles from './CurrentActivity.scss';
import { useSelector } from 'react-redux';

const style = classNames.bind(styles);

const CurrentActivity = () => {
  const runningActivity = useSelector(state => state.app.runningActivity);
  return (
    <div className={ style('current-activity')} >
      <div className={ style('single-activity')}>
        <h1>{runningActivity.title}</h1>
        <p className={ style('single-activity__text-title')}>Beskrivning</p>
        <p>{runningActivity.description}</p>
        <p className={ style('single-activity__text-title')}>Vad du behöver</p>
        <p>{runningActivity.needed}</p>
        <p className={ style('single-activity__text-title')}>Antal</p>
        <p>{runningActivity.numbers}</p>
        <p className={ style('single-activity__text-title')}>Instruktioner</p>
        <p>{runningActivity.instruction}</p>
      </div>
    </div>
  );
};

export default CurrentActivity;
