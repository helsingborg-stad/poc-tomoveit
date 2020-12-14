import React from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

const style = classNames.bind(styles);

const Header = () => {
  const image = useSelector(state => state.app.selectedActivity.image);
  const location = useLocation();
  const history = useHistory();

  const defaultHeader = () => {
    return (
      <div className={ style('header')}>
        <Avatar/>
        <span>TITLE</span>
        <div>

        </div>
      </div>
    );
  };

  const handleClick = () => {
    history.push({ pathname: '/activities' });
  };

  const imageHeader = () => {
    return (
      <div className={ style('header-image')}>
        <img src={image} alt='' />
        <div className={ style('header-image__back')} onClick={handleClick}>
          <svg>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
          </svg>
          <p>TILLBAKA</p>
        </div>
      </div>
    );
  };

  return (
    location.pathname === '/activity' ? imageHeader() : defaultHeader()
  );
};

export default Header;
