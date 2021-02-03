import React from 'react';
import classNames from 'classnames/bind';
import styles from './RoundButton.scss';
import PropTypes from 'prop-types';

const style = classNames.bind(styles);

const RoundButton = (props) => {
  return (
    <button onClick={props.handleClick} className={style('round-button')}>
      <svg>
        <svg>
          <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-refresh' } />
        </svg>
      </svg>
    </button>
  );
};

RoundButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default RoundButton;
