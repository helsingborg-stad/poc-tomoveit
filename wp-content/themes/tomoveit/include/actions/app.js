export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';

export const addActivities = activities => {
  return {
    type: ADD_ACTIVITIES,
    activities,
  };
};
