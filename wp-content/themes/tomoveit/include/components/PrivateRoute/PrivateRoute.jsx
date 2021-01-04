import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const pin = useSelector(state => state.app.pin);

  return (
    <Route
      {...rest}
      render={ (props) => !pin
        ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        : <Component { ...props } />}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  rest: PropTypes.any,
  location: PropTypes.any,
};

export default PrivateRoute;
