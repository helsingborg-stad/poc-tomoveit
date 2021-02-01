import React, { useEffect } from 'react';
import styles from './CompanyActivities.scss';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCompanyActivities } from '../../actions/app';

const style = classNames.bind(styles);

const CompanyActivities = () => {
  const dispatch = useDispatch();
  const companyActivities = useSelector(state => state.app.companyActivities);

  useEffect(() => {
    axios.get('http://tomoveit.test/wp-json/TomoveitRestApi/v1/companyActivities')
      .then((response) => {
        dispatch(addCompanyActivities(response.data));
      }, (error) => {
        console.log(error);
      });
  }, []);

  const cards = companyActivities.map(item => {
    return (
      <div key={item.title} className={style('card')}>
        <div className={style('card__image-container')}>
          <svg className={style('card__svg')}>
            <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-group'}/>
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
      <p>Här är en lista på föreningar du kan prova</p>
      <div className={style('company-activities__container')}>
        {cards}
      </div>
    </div>
  );
};

export default CompanyActivities;
