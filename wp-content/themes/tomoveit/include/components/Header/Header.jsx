import React from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/sv';

const style = classNames.bind(styles);

const Header = () => {
  const image = useSelector(state => state.app.selectedActivity.image);
  const companyActivityId = useSelector(state => state.app.companyActivityId);
  const companyActivities = useSelector(state => state.app.companyActivities);

  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push({ pathname: '/activities' });
  };

  const handleClickStats = () => {
    if (location.pathname === '/statistics') history.push({ pathname: '/activities' });
    else history.push({ pathname: '/statistics' });
  };

  const handleClickCompany = () => {
    history.push({ pathname: '/föreningar' });
  };

  const handleClickBack = () => {
    history.goBack();
  };

  const defaultHeader = () => {
    const currentDate = moment(new Date()).format('dddd DD MMMM');
    moment.locale('sv');

    return (
      <div className={ style('header')}>
        <Avatar/>
        <span>{currentDate}</span>
        <div>
        </div>
      </div>
    );
  };

  const statsHeader = () => {
    const currentDate = moment(new Date()).format('dddd DD MMMM');
    moment.locale('sv');
    return (
      <div className={ style('header')}>
        <Avatar/>
        <span>{currentDate}</span>
        <div className={style('header__stats')}>
          { companyActivities
            ? <svg className={style('header__clubsvg')} onClick={handleClickCompany}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-sports-club-menu'}/>
            </svg> : ''
          }
          <svg onClick={handleClickStats}>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-stats-mono' } />
          </svg>
        </div>
      </div>
    );
  };

  const imageHeader = () => {
    return (
      <div className={ style('header-image')}>
        <img src={image} alt='' />
        <div className={ style('header-image__back', 'header-image__back--white')} onClick={handleClick}>
          <svg>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
          </svg>
          <p>TILLBAKA</p>
        </div>
      </div>
    );
  };

  const companyImageHeader = () => {
    const imgUrl = companyActivities.find(item => item.id === companyActivityId).image;

    return (
      <div className={ style('header-image')}>
        <img src={imgUrl} alt='' />
        <div className={ style('header-image__back', 'header-image__back--white')} onClick={handleClickBack}>
          <svg>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
          </svg>
          <p>TILLBAKA</p>
        </div>
      </div>
    );
  };

  const statsHeaderBack = () => {
    let currentWeek = moment(new Date()).format('W');

    return (
      <div className={ style('header')}>
        <div className={ style('header__back')} onClick={handleClickBack}>
          <svg>
            <use xlinkHref={ 'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-arrow-left' } />
          </svg>
          <p>TILLBAKA</p>
        </div>
        { (location.pathname !== '/föreningar') && <span>DENNA VECKA ({currentWeek})</span> }
        { location.pathname === '/föreningar' && <span>PROVA EN FÖRENING</span> }
        <div></div>
      </div>
    );
  };

  const header = () => {
    if (location.pathname === '/activity') return imageHeader(false);
    else if (location.pathname === '/statistics' || location.pathname === '/föreningar') return statsHeaderBack();
    else if (location.pathname === '/aktivitet') return companyImageHeader();
    else if (location.pathname === '/activities' || location.pathname === '/runningActivity') return statsHeader();
    else return defaultHeader();
  };

  return (
    header()
  );
};

export default Header;
