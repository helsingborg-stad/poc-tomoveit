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
      <img src="https://tomoveit.hbgtest.se/wp-content/uploads/2020/12/tomoveit-avatar.gif"/>
    </div>
  );
};

export default Avatar;
