import React from 'react';
import styles from './SingleCompanyActivity.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { replaceLineBreaksWithHTML } from '../../util/util';
import StickyButton from '../../components/StickyButton/StickyButton.jsx';

const style = classNames.bind(styles);

const SingleCompanyActivities = () => {
  const companyActivities = useSelector(state => state.app.companyActivities);
  const companyActivityId = useSelector(state => state.app.companyActivityId);

  const data = companyActivities.find(item => item.id === companyActivityId);
  const datePublished = moment(data.published).format('DD MMMM YYYY');
  moment.locale('sv');

  const handleClick = () => {};

  return (
    <div className={style('company-single')}>
      <div className={style('company-single__container')}>
        <h1>{data.title}</h1>
        <span>Publicerad {datePublished}</span>
        {data.videoUrl &&
          <div className={style('company-single__player-wrapper')}>
            <ReactPlayer
              className='react-player'
              url={data.videoUrl}
              width='100%'
              height='100%'
            />
            { data.videoText && <p>{data.videoText}</p> }
          </div>
        }
        <div className={style('company-single__content')}>
          <p className={style('company-single__text-title')}>Vad är det för aktivitet?</p>
          <p>{replaceLineBreaksWithHTML(data.description)}</p>
          <p className={style('company-single__text-title')}>Vem kan prova?</p>
          <p>{replaceLineBreaksWithHTML(data.who)}</p>
          <p className={style('company-single__text-title')}>Vad behöver jag ta med mig för att prova?</p>
          <p>{replaceLineBreaksWithHTML(data.needed)}</p>
          <p className={style('company-single__text-title')}>När kan jag prova?</p>
          <p>{data.when}</p>
          <p className={style('company-single__text-title')}>Hur många barn brukar vara med?</p>
          <p>{data.howMany}</p>
          <p className={style('company-single__text-title')}>Kan jag ta med en kompis?</p>
          <p>{data.friends}</p>
          <p className={style('company-single__text-title')}>Vart nånstans ligger träningslokalen?</p>
          <p>{data.directions}</p>
          <p className={style('company-single__text-title')}>Google maps länk</p>
          <a href={data.addressLink} target="blank">{data.address}</a>
          <p className={style('company-single__text-title')}>Bilder från föreningen</p>
          <div className={style('company-single__images')}>
            {data.imageUrl1 && <img src={data.imageUrl1} alt='' /> }
            {data.imageUrl2 && <img src={data.imageUrl2} alt='' /> }
            {data.imageUrl3 && <img src={data.imageUrl3} alt='' /> }
            {data.imageUrl4 && <img src={data.imageUrl4} alt='' /> }
            {data.imageUrl5 && <img src={data.imageUrl5} alt='' /> }
          </div>
          <div className={style('company-single__line')}></div>
          <p className={style('company-single__text-title')}>Denna sida är skapad av?</p>
          <p>{data.author}</p>
          <StickyButton to={data.link} text='PROVA' handleClick={handleClick} colorGreen={true} outsideLink={true}/>
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyActivities;
