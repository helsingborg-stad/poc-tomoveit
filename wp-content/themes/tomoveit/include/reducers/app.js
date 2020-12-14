import { ADD_ACTIVITIES, SELECTED_CARD, CHANGE_HEADER, RUNNING_ACTIVITY } from '../actions/app';

const INITIAL_STATE = {
  activities: [],
  selectedActivity: {},
  headerParams: { image: false },
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
    default: return state;
  }
};
export default reducer;
