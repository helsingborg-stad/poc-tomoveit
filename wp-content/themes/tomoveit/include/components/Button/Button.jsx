import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const style = classNames.bind(styles);

const Button = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(props.to);
  };

  const color = props.whiteColor ? 'button--white' : '';

  return (
    <button onClick={props.handleClick ? props.handleClick : handleClick} className={ style('button', color)}>
      {props.text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
  whiteColor: PropTypes.bool,
};
export default Button;
