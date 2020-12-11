import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';
const style = classNames.bind(styles);

const Input = (props) => {
  return (
    <input type="text" maxLength='4'/>
  );
};

export default Input;
