import { combineReducers } from "redux";
import authReducer from "./Auth";
import eventReducer from "./Event";
import usersManagementReducer from "./UsersManagement";
import theaterReducer from "./Theater";
import BookTicketReducer from "./BookTicket";
import eventDetailReducer from "./EventDetail";
import modalTrailerReducer from "./ModalTrailer";
import lazyReducer from "./Lazy";

const rootReducer = combineReducers({
  authReducer,
  eventReducer,
  usersManagementReducer,
  theaterReducer,
  BookTicketReducer,
  eventDetailReducer,
  modalTrailerReducer,
  lazyReducer,
});
export default rootReducer;
