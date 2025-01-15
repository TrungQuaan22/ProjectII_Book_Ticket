import theatersApi from "../../api/theatersApi";
import {
  GET_EVENT_SHOWTIMES_REQUESS,
  GET_EVENT_SHOWTIMES_SUCCESS,
  GET_EVENT_SHOWTIMES_FAIL,
} from "../constants/EventDetail";

export const getEventShowtimes = (eventId) => {
  return (dispatch) => {
    dispatch({
      type: GET_EVENT_SHOWTIMES_REQUESS,
    });
    theatersApi
      .getThongTinLichChieuSukien(eventId)
      .then((result) => {
        dispatch({
          type: GET_EVENT_SHOWTIMES_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_EVENT_SHOWTIMES_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};
