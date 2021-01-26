import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../../pages/SingleActivity/SingleActivity.scss';
import { useHistory } from 'react-router-dom';
import StickyButton from '../../components/StickyButton/StickyButton.jsx';
import axios from 'axios';
import { runningActivity } from '../../actions/app';
import { replaceLineBreaksWithHTML } from '../../util/util';

const style = classNames.bind(styles);

const SingleActivity = () => {
  const selectedActivity = useSelector(state => state.app.selectedActivity);
  const runningActivityData = useSelector(state => state.app.runningActivity[0]);
  const pin = useSelector(state => state.app.pin);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/setActivity', {
      selectedPostId: selectedActivity.postId.toString(),
      pin: pin,
    },
    ).then((response) => {
      console.log(response.data);
      if (response.data !== false) {
        dispatch(runningActivity(response.data));
        history.replace({ pathname: '/runningActivity' });
      } else history.push({ pathname: '/' });
    }, (error) => {
      console.log(error);
    });
  };

  const titleColor = selectedActivity.group ? 'single-activity__title--blue' : 'single-activity__title--green';
  return (
    <div className={ style('single-activity')}>
      <h1 className={style(titleColor)}>{selectedActivity.title}</h1>
      <p className={ style('single-activity__text-title')}>Beskrivning</p>
      <p>{replaceLineBreaksWithHTML(selectedActivity.description)}</p>
      <p className={ style('single-activity__text-title')}>Vad du behöver</p>
      <p>{replaceLineBreaksWithHTML(selectedActivity.needed)}</p>
      <p className={ style('single-activity__text-title')}>Antal</p>
      <p>{selectedActivity.numbers}</p>
      <p className={ style('single-activity__text-title')}>Instruktioner</p>
      <p>{replaceLineBreaksWithHTML(selectedActivity.instruction)}</p>
      <StickyButton disable={!!runningActivityData} to='/' text='KÖR!' handleClick={handleClick}/>
    </div>
  );
};

export default SingleActivity;
