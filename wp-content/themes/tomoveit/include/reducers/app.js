import { ADD_ACTIVITIES } from '../actions/app';

const INITIAL_STATE = {
  activities: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: action.activities,
      };
    default: return state;
  }
};
export default reducer;
