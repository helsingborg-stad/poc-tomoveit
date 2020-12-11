import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';
import PropTypes from 'prop-types';
const style = classNames.bind(styles);

const Input = (props) => {
  return (
    <input onChange={props.handleChange} type="password" maxLength='4'/>
  );
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
export default Input;
