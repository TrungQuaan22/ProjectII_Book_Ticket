import eventsApi from "../../api/eventsApi";

import {
  GET_EVENT_LIST_REQUEST,
  GET_EVENT_LIST_SUCCESS,
  GET_EVENT_LIST_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  POST_UPDATE_EVENT_REQUEST,
  POST_UPDATE_EVENT_SUCCESS,
  POST_UPDATE_EVENT_FAIL,
  UPDATE_NONEIMAGE_EVENT_REQUEST,
  UPDATE_NONEIMAGE_EVENT_SUCCESS,
  UPDATE_NONEIMAGE_EVENT_FAIL,
  GET_EVENT_LIST_REQUEST2,
  GET_EVENT_LIST_SUCCESS2,
  GET_EVENT_LIST_FAIL2,
  ADD_EVENT_UPLOAD_REQUEST,
  ADD_EVENT_UPLOAD_SUCCESS,
  ADD_EVENT_UPLOAD_FAIL,
  RESET_EVENT_MANAGEMENT,
  SAVE_BEFOREINSTALLPROMPT_EVENT,
} from "../constants/Event";

export const getEventList = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_EVENT_LIST_REQUEST,
    });
    try {
      const result = await eventsApi.getDanhSachSukien();
      dispatch({
        type: GET_EVENT_LIST_SUCCESS,
        payload: { data: result.data },
      });
    } catch (error) {
      dispatch({
        type: GET_EVENT_LIST_FAIL,
        payload: {
          errorEventList: error.response?.data
            ? error.response.data
            : error.message,
        },
      });
    }
  };
};

export const getEventListManagement = () => {
  return (dispatch) => {
    dispatch({
      type: GET_EVENT_LIST_REQUEST2,
    });
    eventsApi
      .getDanhSachSukien()
      .then((result) => {
        dispatch({
          type: GET_EVENT_LIST_SUCCESS2,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_EVENT_LIST_FAIL2,
          payload: {
            errorEventList: error.response?.data
              ? error.response.data
              : error.message,
          },
        });
      });
  };
};

export const deleteEvent = (maSukien) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_EVENT_REQUEST,
    });
    eventsApi
      .deleteEvent(maSukien)
      .then((result) => {
        dispatch({
          type: DELETE_EVENT_SUCCESS,
          payload: { data: result.data },
        });

        window.location.reload();
      })
      .catch((error) => {
        const message = error?.response?.data
          ? error.response.data
          : "Xóa thành công nhưng backend return error";
        dispatch({
          type: DELETE_EVENT_FAIL,
          payload: { error: message },
        });
      });
  };
};

export const updateEventUpload = (sukienObj) => {
  return (dispatch) => {
    dispatch({
      type: POST_UPDATE_EVENT_REQUEST,
    });
    eventsApi
      .postCapNhatSukien(sukienObj)
      .then((result) => {
        dispatch({
          type: POST_UPDATE_EVENT_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_UPDATE_EVENT_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};
export const updateEvent = (sukienObj) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_NONEIMAGE_EVENT_REQUEST,
    });
    eventsApi
      .postCapNhatSukien(sukienObj)
      .then((result) => {
        dispatch({
          type: UPDATE_NONEIMAGE_EVENT_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_NONEIMAGE_EVENT_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};

export const addEventUpload = (eventObj) => {
  return (dispatch) => {
    dispatch({
      type: ADD_EVENT_UPLOAD_REQUEST,
    });
    eventsApi
      .postThemSukien(eventObj)
      .then((result) => {
        dispatch({
          type: ADD_EVENT_UPLOAD_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_EVENT_UPLOAD_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};

export const resetEventsManagement = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_EVENT_MANAGEMENT,
    });
  };
};

export const saveBeforeinstallpromptEvent = (event) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_BEFOREINSTALLPROMPT_EVENT,
      payload: { event },
    });
  };
};
