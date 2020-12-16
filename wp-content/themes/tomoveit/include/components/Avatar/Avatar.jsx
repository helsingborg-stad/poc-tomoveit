import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.scss';

const style = classNames.bind(styles);

const Avatar = () => {
  return (
    <div className={ style('avatar')} >
      <svg>
        <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-tomoveit-avatar' } />
      </svg>
    </div>
  );
};

export default Avatar;
