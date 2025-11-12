import {
  SETMESSAGELOADING,
  SETMESSAGES,
  type MessageAction,
  type MessageStateType,
} from "./type";

const initialState: MessageStateType = {
  messages: [],
  messageLoading: false,
};

// Reducer function
export const messageReducer = (
  state = initialState,
  action: MessageAction
): MessageStateType => {
  switch (action.type) {
    case SETMESSAGES:
      return { ...state, messages: action.payload };
    case SETMESSAGELOADING:
      return { ...state, messageLoading: action.payload };
    default:
      return state;
  }
};
