import React from 'react';
import classNames from 'classnames/bind';
import styles from './Container.scss';
import PropTypes from 'prop-types';

const style = classNames.bind(styles);

const Container = (props) => {
  return (
    <div className={ style('container', 'container__inner', 'section')}>
      {props.children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Container;
