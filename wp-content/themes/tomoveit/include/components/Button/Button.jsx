import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const style = classNames.bind(styles);

const Button = (props) => {
  return (
    <button onClick={props.handleClick} className={ style('button')}>
      {props.text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
};
export default Button;
