import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';
import PropTypes from 'prop-types';
const style = classNames.bind(styles);

const Input = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input autoFocus onChange={props.handleChange} type="password" maxLength='4' ref={inputRef} required />
  );
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
export default Input;
