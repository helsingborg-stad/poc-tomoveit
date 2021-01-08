import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CardContainer.scss';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { selectCard } from '../../actions/app';

const style = classNames.bind(styles);

const CardContainer = () => {
  const activities = useSelector(state => state.app.activities);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(selectCard(item));
    history.replace({ pathname: '/activity' });
  };

  const cards = activities.map(item => {
    const titleColor = item.group ? 'card__text--blue' : 'card__text--green';

    return (
      <div key={item.title} className={style('card')} onClick={() => handleClick(item)}>
        <div className={style('card__image-container')}>
          { !item.group &&
            <svg className={style('card__svg', 'card__svg--single')}>
              <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-single'}/>
            </svg>
          }
          { item.group &&
          <svg className={style('card__svg')}>
            <use xlinkHref={'wp-content/themes/tomoveit/dist/spritemap.svg#order-icon-group'}/>
          </svg>
          }
          <img className={style('card__image')} src={item.image} alt={'Alt'} />
        </div>
        <div className={style('card__text')}>
          <p className={style(titleColor)}>{item.title}</p>
          <p>{item.time}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={ style('card-container')}>
      {cards}
    </div>
  );
};

export default CardContainer;
