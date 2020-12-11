import React from 'react';
import classNames from 'classnames/bind';
import styles from './BottomContainer.scss';
import PropTypes from 'prop-types';

const style = classNames.bind(styles);

const BottomContainer = (props) => {
  return (
    <div className={ style('bottom-container')}>
      {props.children}
    </div>
  );
};

BottomContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
export default BottomContainer;
