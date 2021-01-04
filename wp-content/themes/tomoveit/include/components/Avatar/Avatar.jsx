import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.scss';
import { useLocation, useHistory } from 'react-router-dom';
const style = classNames.bind(styles);

const Avatar = () => {
  const location = useLocation();
  const history = useHistory();

  const handleClickAvatar = () => {
    if (location.pathname !== '/') history.push({ pathname: '/' });
  };

  return (
    <div className={ style('avatar')} onClick={handleClickAvatar} >
      <svg>
        <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-sporty' } />
      </svg>
    </div>
  );
};

export default Avatar;
