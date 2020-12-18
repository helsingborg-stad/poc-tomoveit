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

  const handleClick = () => {
    history.push({ pathname: '/activities' });
  };

  const handleClickStats = () => {
    if (location.pathname === '/statistics') history.push({ pathname: '/activities' });
    else history.push({ pathname: '/statistics' });
  };

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

  const statsHeader = () => {
    return (
      <div className={ style('header')}>
        <Avatar/>
        <span>TITLE</span>
        <div className={style('header__stats')} onClick={handleClickStats}>
          <svg>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-stats' } />
          </svg>
        </div>
      </div>
    );
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

  const header = () => {
    if (location.pathname === '/activity') return imageHeader();
    else if (location.pathname === '/activities' || location.pathname === '/statistics') return statsHeader();
    else return defaultHeader();
  };

  return (
    header()
  );
};

export default Header;
