import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../../pages/SingleActivity/SingleActivity.scss';

const style = classNames.bind(styles);

const SingleActivity = () => {
  const selectedActivity = useSelector(state => state.app.selectedActivity);

  const titleColor = selectedActivity.group ? 'single-activity__title--blue' : 'single-activity__title--green';
  return (
    <div className={ style('single-activity')}>
      <h1 className={style(titleColor)}>{selectedActivity.title}</h1>
      <p className={ style('single-activity__text-title')}>Beskrivning</p>
      <p className={ style('single-activity__text-title')}>Vad du behöver</p>
      <p className={ style('single-activity__text-title')}>Antal</p>
      <p className={ style('single-activity__text-title')}>Instruktioner</p>
    </div>
  );
};

export default SingleActivity;
