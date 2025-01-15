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
} from "./constants/Event";

const initialState = {
  eventList: [],
  loadingEventList: false,
  errorEventList: null,
  eventDetail: null,

  eventList2: null,
  loadingEventList2: false,
  errorEventList2: null,

  successDeleteEvent: "",
  loadingDeleteEvent: false,
  errorDeleteEvent: null,

  successUpdateEvent: "",
  loadingUpdateEvent: false,
  errorUpdateEvent: null,

  successUpdateNoneImageEvent: "",
  loadingUpdateNoneImageEvent: false,
  errorUpdateNoneImageEvent: null,

  successAddUploadEvent: "",
  loadingAddUploadEvent: false,
  errorAddUploadEvent: null,

  saveBeforeinstallpromptEvent: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT_LIST_REQUEST: {
      return {
        ...state,
        loadingEventList: true,
        errorEventList: null,
        eventDetail: null,
      };
    }
    case GET_EVENT_LIST_SUCCESS: {
      return {
        ...state,
        eventList: action.payload.data,
        loadingEventList: false,
      };
    }
    case GET_EVENT_LIST_FAIL: {
      return {
        ...state,
        errorEventList: action.payload.errorEventList,
        loadingEventList: false,
      };
    }

    case GET_EVENT_LIST_REQUEST2: {
      return { ...state, loadingEventList2: true, errorEventList2: null };
    }
    case GET_EVENT_LIST_SUCCESS2: {
      return {
        ...state,
        eventList2: action.payload.data,
        loadingEventList2: false,
      };
    }
    case GET_EVENT_LIST_FAIL2: {
      return {
        ...state,
        errorEventList2: action.payload.errorEventList,
        loadingEventList2: false,
      };
    }

    case DELETE_EVENT_REQUEST: {
      return { ...state, loadingDeleteEvent: true, errorDeleteEvent: null };
    }
    case DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        successDeleteEvent: action.payload.data,
        loadingDeleteEvent: false,
      };
    }
    case DELETE_EVENT_FAIL: {
      return {
        ...state,
        errorDeleteEvent: action.payload.error,
        loadingDeleteEvent: false,
      };
    }

    case POST_UPDATE_EVENT_REQUEST: {
      return { ...state, loadingUpdateEvent: true, errorUpdateEvent: null };
    }
    case POST_UPDATE_EVENT_SUCCESS: {
      return {
        ...state,
        successUpdateEvent: action.payload.data,
        loadingUpdateEvent: false,
      };
    }
    case POST_UPDATE_EVENT_FAIL: {
      return {
        ...state,
        errorUpdateEvent: action.payload.error,
        loadingUpdateEvent: false,
      };
    }

    case UPDATE_NONEIMAGE_EVENT_REQUEST: {
      return {
        ...state,
        loadingUpdateNoneImageEvent: true,
        errorUpdateNoneImageEvent: null,
      };
    }
    case UPDATE_NONEIMAGE_EVENT_SUCCESS: {
      return {
        ...state,
        successUpdateNoneImageEvent: action.payload.data,
        loadingUpdateNoneImageEvent: false,
      };
    }
    case UPDATE_NONEIMAGE_EVENT_FAIL: {
      return {
        ...state,
        errorUpdateNoneImageEvent: action.payload.error,
        loadingUpdateNoneImageEvent: false,
      };
    }

    case ADD_EVENT_UPLOAD_REQUEST: {
      return {
        ...state,
        loadingAddUploadEvent: true,
        errorAddUploadEvent: null,
      };
    }
    case ADD_EVENT_UPLOAD_SUCCESS: {
      return {
        ...state,
        successAddUploadEvent: action.payload.data,
        loadingAddUploadEvent: false,
      };
    }
    case ADD_EVENT_UPLOAD_FAIL: {
      return {
        ...state,
        errorAddUploadEvent: action.payload.error,
        loadingAddUploadEvent: false,
      };
    }

    case RESET_EVENT_MANAGEMENT: {
      return {
        ...state,
        loadingEventList2: false,
        errorEventList2: null,

        successDeleteEvent: "",
        loadingDeleteEvent: false,
        errorDeleteEvent: null,

        successUpdateEvent: "",
        loadingUpdateEvent: false,
        errorUpdateEvent: null,

        successUpdateNoneImageEvent: "",
        loadingUpdateNoneImageEvent: false,
        errorUpdateNoneImageEvent: null,

        successAddUploadEvent: "",
        loadingAddUploadEvent: false,
        errorAddUploadEvent: null,
      };
    }

    case SAVE_BEFOREINSTALLPROMPT_EVENT: {
      state.saveBeforeinstallpromptEvent = action.payload.event;
      return state;
    }
    default:
      return state;
  }
};
export default eventReducer;
