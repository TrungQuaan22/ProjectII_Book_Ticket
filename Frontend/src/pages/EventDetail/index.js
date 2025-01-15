import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getEventShowtimes } from "../../reducers/actions/EventDetail";
import { DISPLAY_MOBILE_HOMEPAGE } from "../../constants/config";
import { RESET_EVENTDETAIL_REDUCER } from "../../reducers/constants/EventDetail";
import Detail from "./Detail";
export default function Index() {
  const isMobile = useMediaQuery(DISPLAY_MOBILE_HOMEPAGE);
  const { eventDetailShowtimes, errorEventDetailShowtimes } = useSelector(
    (state) => state.eventDetailReducer
  );
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(getEventShowtimes(param.maSukien));
    return () => {
      dispatch({ type: RESET_EVENTDETAIL_REDUCER });
    };
  }, []);

  if (errorEventDetailShowtimes) {
    return <div>{errorEventDetailShowtimes}</div>;
  }
  return (
    <>
      <Detail eventDetailShowtimes={eventDetailShowtimes} isMobile={isMobile} />
    </>
  );
}
