import { combineReducers, createStore } from "redux";
import { userReducer } from "./user/reducer";
import { messageReducer } from "./messages/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

// Create store
export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
