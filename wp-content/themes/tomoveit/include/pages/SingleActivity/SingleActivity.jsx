import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../../pages/SingleActivity/SingleActivity.scss';
import { useHistory } from 'react-router-dom';
import StickyButton from '../../components/StickyButton/StickyButton.jsx';
import axios from 'axios';
import { runningActivity } from '../../actions/app';
import { replaceLineBreaksWithHTML } from '../../util/util';
import ReactPlayer from 'react-player';

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
      <div>
        <h1>{selectedActivity.title}</h1>
        <p className={ style('single-activity__text-title', titleColor)}>Beskrivning</p>
        <p>{replaceLineBreaksWithHTML(selectedActivity.description)}</p>
        <p className={ style('single-activity__text-title', titleColor)}>Vad du behöver</p>
        <p>{replaceLineBreaksWithHTML(selectedActivity.needed)}</p>
        <p className={ style('single-activity__text-title', titleColor)}>Antal</p>
        <p>{selectedActivity.numbers}</p>
        <p className={ style('single-activity__text-title', titleColor)}>Instruktioner</p>
        <p>{replaceLineBreaksWithHTML(selectedActivity.instruction)}</p>
        {selectedActivity.videoUrl &&
        <>
          <p className={ style('single-activity__text-title', titleColor)}>Video</p>
          <div className={style('single-activity__player-wrapper')}>
            <ReactPlayer
              className='react-player'
              url={selectedActivity.videoUrl}
              width='100%'
              height='100%'
            />
            { selectedActivity.videoText && <p>{selectedActivity.videoText}</p> }
          </div>
        </>
        }
        <StickyButton disable={!!runningActivityData} to='/' text='KÖR!' handleClick={handleClick}/>
        {selectedActivity.author &&
        <>
          <div className={style('single-activity__line')}></div>
          <p className={style('single-activity__text-title', titleColor)}>Denna aktivitet är skapad av </p>
          <p>{selectedActivity.author}</p>
        </>
        }
      </div>
    </div>
  );
};

export default SingleActivity;
