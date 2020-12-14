export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const SELECTED_CARD = 'SELECTED_CARD';
export const CHANGE_HEADER = 'CHANGE_HEADER';

export const addActivities = activities => {
  return {
    type: ADD_ACTIVITIES,
    activities,
  };
};

export const selectCard = selectedActivity => {
  return {
    type: SELECTED_CARD,
    selectedActivity,
  };
};

export const changeHeader = headerParams => {
  return {
    type: CHANGE_HEADER,
    headerParams,
  };
};
