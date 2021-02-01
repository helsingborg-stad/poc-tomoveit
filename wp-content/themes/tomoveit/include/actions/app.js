export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const ADD_COMPANY_ACTIVITIES = 'ADD_COMPANY_ACTIVITIES';
export const SELECTED_CARD = 'SELECTED_CARD';
export const SELECT_COMPANY_ACTIVITY = 'SELECT_COMPANY_ACTIVITY';
export const CHANGE_HEADER = 'CHANGE_HEADER';
export const RUNNING_ACTIVITY = 'RUNNING_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const SET_PIN = 'SET_PIN';
export const SET_DATA = 'SET_DATA';
export const SET_TEXTS = 'SET_TEXTS';
export const SET_ADMIN = 'SET_ADMIN';

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

export const runningActivity = runningActivity => {
  return {
    type: RUNNING_ACTIVITY,
    runningActivity,
  };
};

export const deleteActivity = id => {
  return {
    type: DELETE_ACTIVITY,
    id,
  };
};

export const setPin = pin => {
  return {
    type: SET_PIN,
    pin,
  };
};

export const setData = data => {
  return {
    type: SET_DATA,
    data,
  };
};

export const setTexts = texts => {
  return {
    type: SET_TEXTS,
    texts,
  };
};

export const setAdmin = admin => {
  return {
    type: SET_ADMIN,
    admin,
  };
};

export const addCompanyActivities = activities => {
  return {
    type: ADD_COMPANY_ACTIVITIES,
    activities,
  };
};

export const selectCompanyActivity = companyActivityId => {
  return {
    type: SELECT_COMPANY_ACTIVITY,
    companyActivityId,
  };
};
