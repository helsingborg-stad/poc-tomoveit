import React from 'react';
import classNames from 'classnames/bind';
import styles from './StickyButton.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const style = classNames.bind(styles);

const StickyButton = (props) => {
  const history = useHistory();

  const disableClass = props.disable ? 'sticky-button__disabled' : '';
  const colorStyle = props.colorGreen ? 'sticky-button--green' : '';

  const handleClick = () => {
    history.push(props.to);
  };

  return (
    <>
    { !props.outsideLink &&
      <button disabled={props.disable} onClick={props.handleClick ? props.handleClick : handleClick} className={style('sticky-button', disableClass, colorStyle)}>
        {props.text}
      </button>
    }
    { props.outsideLink &&
      <a href={props.to} target="_blank" rel="noreferrer">
        <button disabled={props.disable} onClick={props.handleClick ? props.handleClick : handleClick} className={style('sticky-button', disableClass, colorStyle)}>
          {props.text}
        </button>
      </a>
    }
  </>
  );
};

StickyButton.propTypes = {
  text: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
  disable: PropTypes.bool,
  colorGreen: PropTypes.bool,
  outsideLink: PropTypes.bool,
};
export default StickyButton;
