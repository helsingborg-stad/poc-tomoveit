import React from 'react';
import styles from './Modal.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const style = classNames.bind(styles);

const Modal = (props) => {
  const show = props.open ? 'modal__open' : 'modal__closed';
  const titleColor = props.group ? 'modal__title--blue' : 'modal__title--green';

  return (
    <div className={style('modal', show)}>
      <div className={style('modal__close')} onClick={props.onClose}>
        <p>Stäng</p>
        <svg>
          <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-cancel' } />
        </svg>
      </div>
      <h3>Snyggt jobbat!</h3>
      <p>Du provade och klara aktiviteten:<br/></p>
      <p className={style(titleColor)}>{props.title}</p>
      <img src='https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/job-done-giphy.gif' alt='gif'/>
    </div>
  );
};

Modal.propTypes = {
  group: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
