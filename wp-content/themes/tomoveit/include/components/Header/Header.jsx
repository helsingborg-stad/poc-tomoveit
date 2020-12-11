import React from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const style = classNames.bind(styles);

const Header = () => {
  return (
    <div className={ style('header')}>
      <Avatar/>
      <span>LOGGA IN</span>
      <div>

      </div>
    </div>
  );
};

export default Header;
