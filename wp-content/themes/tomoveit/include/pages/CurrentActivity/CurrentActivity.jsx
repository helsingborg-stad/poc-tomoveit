import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CurrentActivity.scss';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button/Button.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { runningActivity, selectCard, deleteActivity } from '../../actions/app';

const style = classNames.bind(styles);

const CurrentActivity = () => {
  const runningActivityData = useSelector(state => state.app.runningActivity[0]);
  const pin = useSelector(state => state.app.pin);
  const titleColor = runningActivityData.group ? 'card-current__text--blue' : 'card-current__text--green';
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleClickOk = () => {
    axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/setDoneActivity', {
      postId: runningActivityData.postId,
      pin: pin,
    },
    ).then((response) => {
      setShowModal(true);
    }, (error) => {
      console.log(error);
    });
  };

  const handleClickNo = () => {
    axios.post('https://tomoveit.hbgtest.se/wp-json/TomoveitRestApi/v1/resetActivity', {
      pin: pin,
    },
    ).then(() => {
    }, (error) => {
      console.log(error);
    });
    dispatch(runningActivity(false));
    history.replace('/activities');
  };

  const modalOnClose = () => {
    history.replace('/activities');
    setShowModal(false);
    dispatch(deleteActivity(runningActivityData.postId));
    dispatch(runningActivity(false));
    dispatch(selectCard({}));
  };

  const handleClickCard = (item) => {
    history.push({ pathname: '/activity' });
  };

  return (

    <div className={ style('area')}>
      <div className={ style('current-activity')} >
        <div className={ style('current-activity__title')}>
          <h1>Du har valt en aktivitet</h1>
          <p>Försök göra aktiviteten under dagen. Glöm inte att ha skoj 😄</p>
        </div>
        <div className={ style('current-activity__warp')}>
          <div key={runningActivityData.title} onClick={handleClickCard} className={style('card-current')}>
            <div className={style('card-current__image-container')}>
              { !runningActivityData.group &&
              <svg className={style('card-current__svg', 'card-current__svg--single')}>
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

        <div className={ style('current-activity__button')}>
          <Button handleClick={handleClickOk} to={'/welcome'} text={'JAG KLARA DET!'}/>
          <Button handleClick={handleClickNo} whiteColor={true} to={'/welcome'} text={'JAG ÅNGRA MIG!'}/>
        </div>
        <Modal onClose={modalOnClose} open={showModal} group={runningActivityData.group} title={runningActivityData.title} />
      </div>
      <ul className={ style('circles')}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default CurrentActivity;
