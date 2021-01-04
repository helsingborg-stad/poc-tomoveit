import React from 'react';
import classNames from 'classnames/bind';

import styles from './Spinner.scss';
const style = classNames.bind(styles);

const Spinner = () => (
  <div className={style('sk-circle', 'spinner')}>
    <div className={style('sk-circle1', 'sk-child')}/>
    <div className={style('sk-circle2', 'sk-child')}/>
    <div className={style('sk-circle3', 'sk-child')}/>
    <div className={style('sk-circle4', 'sk-child')}/>
    <div className={style('sk-circle5', 'sk-child')}/>
    <div className={style('sk-circle6', 'sk-child')}/>
    <div className={style('sk-circle7', 'sk-child')}/>
    <div className={style('sk-circle8', 'sk-child')}/>
    <div className={style('sk-circle9', 'sk-child')}/>
    <div className={style('sk-circle10', 'sk-child')}/>
    <div className={style('sk-circle11', 'sk-child')}/>
    <div className={style('sk-circle12', 'sk-child')}/>
  </div>
);
export default Spinner;
