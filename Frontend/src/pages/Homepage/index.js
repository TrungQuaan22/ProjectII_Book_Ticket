import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getEventList } from "../../reducers/actions/Event";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListEvent from "./ListEvent";

export default function Homepage() {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventReducer.eventList);
  const theaterList = useSelector((state) => state.theaterReducer.theaterList);

  useEffect(() => {
    if (!eventList.length) {
      dispatch(getEventList());
    }
  }, []);

  return (
    <div>
      <ListEvent eventList = {eventList}/>
    </div>
  );
}
