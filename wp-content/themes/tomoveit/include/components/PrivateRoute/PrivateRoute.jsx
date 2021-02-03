import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPin } from '../../actions/app';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const pin = useSelector(state => state.app.pin);

  useEffect(() => {
    window.addEventListener('beforeunload', callEvent);
    return () => {
      window.removeEventListener('beforeunload', callEvent);
    };
  }, []);

  const callEvent = e => {
    e.preventDefault();
    dispatch(setPin(''));
  };

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
