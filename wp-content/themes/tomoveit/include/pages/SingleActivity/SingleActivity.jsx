import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../../pages/SingleActivity/SingleActivity.scss';

import StickyButton from '../../components/StickyButton/StickyButton.jsx';
import axios from 'axios';

const style = classNames.bind(styles);

const SingleActivity = () => {
  const selectedActivity = useSelector(state => state.app.selectedActivity);

  const handleClick = () => {
    axios.post('http://tomoveit.test/wp-json/TomoveitRestApi/v1/setActivity', {
      selectedPostId: selectedActivity.id,
      pin: '1234',
    },
    ).then(() => {
      console.log('ok');
    }, (error) => {
      console.log(error);
    });
  };

  const titleColor = selectedActivity.group ? 'single-activity__title--blue' : 'single-activity__title--green';
  return (
    <div className={ style('single-activity')}>
      <h1 className={style(titleColor)}>{selectedActivity.title}</h1>
      <p className={ style('single-activity__text-title')}>Beskrivning</p>
      <p>{selectedActivity.description}</p>
      <p className={ style('single-activity__text-title')}>Vad du behöver</p>
      <p>{selectedActivity.needed}</p>
      <p className={ style('single-activity__text-title')}>Antal</p>
      <p>{selectedActivity.numbers}</p>
      <p className={ style('single-activity__text-title')}>Instruktioner</p>
      <p>{selectedActivity.instruction}</p>
      <StickyButton to='/' text='KÖR!' handleClick={handleClick}/>
    </div>
  );
};

export default SingleActivity;
