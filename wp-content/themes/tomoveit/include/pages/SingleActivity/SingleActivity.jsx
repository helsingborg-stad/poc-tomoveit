import React from 'react';
import { useSelector } from 'react-redux';

const SingleActivity = () => {
  const selectedActivity = useSelector(state => state.app.selectedActivity);

  return (
    <div>
      <p>{selectedActivity.title}</p>
    </div>
  );
};

export default SingleActivity;
