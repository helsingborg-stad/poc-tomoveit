import React from 'react';
import classNames from 'classnames/bind';
import styles from './StickyButton.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const style = classNames.bind(styles);

const StickyButton = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(props.to);
  };

  return (
    <button onClick={props.handleClick ? props.handleClick : handleClick} className={ style('sticky-button')}>
      {props.text}
    </button>
  );
};

StickyButton.propTypes = {
  text: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
};
export default StickyButton;
