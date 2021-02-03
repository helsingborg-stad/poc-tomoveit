import React from 'react';
import styles from './CompanyActivities.scss';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActivity } from '../../actions/app';
import { useHistory } from 'react-router-dom';

const style = classNames.bind(styles);

const CompanyActivities = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const companyActivities = useSelector(state => state.app.companyActivities);

  const handleClick = (id) => {
    dispatch(selectCompanyActivity(id));
    history.push({ pathname: '/aktivitet' });
  };

  const cards = companyActivities.map(item => {
    return (
      <div key={item.title} className={style('card')} onClick={() => handleClick(item.id)}>
        <div className={style('card__image-container')}>
          <svg className={style('card__svg')}>
            <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-sports-club'}/>
          </svg>
          <img className={style('card__image')} src={item.image} alt={'Alt'} />
        </div>
        <div className={style('card__text')}>
          <p className={style('card__title')}>{item.title}</p>
          <p>{item.cardText}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={style('company-activities')}>
      <h1>Föreningar i Helsingborg ⭐️</h1>
      <h3>Här är en lista på föreningar du kan prova</h3>
      <div className={style('company-activities__container')}>
        {cards}
      </div>
    </div>
  );
};

export default CompanyActivities;
