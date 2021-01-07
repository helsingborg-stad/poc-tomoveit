import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPin } from '../../actions/app';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pin = useSelector(state => state.app.pin);
  const [seconds, setSeconds] = useState(600);
  const [timeout, setTimeoutRedirect] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeoutRedirect(true);
      dispatch(setPin(''));
      history.push('/');
    }
  });

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
