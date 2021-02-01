import {
  ADD_ACTIVITIES,
  ADD_COMPANY_ACTIVITIES,
  SELECTED_CARD,
  CHANGE_HEADER,
  RUNNING_ACTIVITY,
  DELETE_ACTIVITY,
  SET_PIN,
  SET_DATA,
  SET_TEXTS,
  SET_ADMIN,
  SELECT_COMPANY_ACTIVITY,
} from '../actions/app';

const INITIAL_STATE = {
  activities: [],
  selectedActivity: {},
  headerParams: { image: false },
  runningActivity: [{}],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: action.activities,
      };
    case SELECTED_CARD:
      return {
        ...state,
        selectedActivity: action.selectedActivity,
      };
    case CHANGE_HEADER:
      return {
        ...state,
        headerParams: action.headerParams,
      };
    case RUNNING_ACTIVITY:
      return {
        ...state,
        runningActivity: action.runningActivity,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(item => item.postId !== action.id),
      };
    case SET_PIN:
      return {
        ...state,
        pin: action.pin,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SET_TEXTS:
      return {
        ...state,
        texts: action.texts,
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case ADD_COMPANY_ACTIVITIES:
      return {
        ...state,
        companyActivities: action.activities,
      };
    case SELECT_COMPANY_ACTIVITY:
      return {
        ...state,
        companyActivityId: action.companyActivityId,
      };
    default: return state;
  }
};
export default reducer;
