import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.scss';
import PropTypes from 'prop-types';
const style = classNames.bind(styles);

const Button = (props) => {
  return (
    <a className={ style('button')} href={props.to}>
      {props.text}
    </a>
  );
};

Button.propTypes = {
  text: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
};
export default Button;
