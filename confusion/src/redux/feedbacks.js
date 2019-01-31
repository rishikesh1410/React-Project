import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = { errMess: null, feedbacks:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        console.log(feedback);
        alert("Thank you for your feedback\n");
        alert(JSON.stringify(feedback));
        return { ...state, feedbacks: state.feedbacks.concat(feedback)};

    default:
      return state;
  }
};