import {
  type UserAction,
  type UserState,
  SETUSERLOADING,
  SETUSER,
} from "./type";

const initialState: UserState = {
  user: null,
  userLoading: false,
};

// Reducer function
export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SETUSER:
      return { ...state, user: action.payload };
    case SETUSERLOADING:
      return { ...state, userLoading: action.payload };
    default:
      return state;
  }
};
