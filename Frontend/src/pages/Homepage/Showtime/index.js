import React, { useState, useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Desktop from "./Desktop";
import useStyles from "./style";
import {
  DATE_BEGIN_DANGCHIEU,
  DATE_END_DANGCHIEU,
  DATE_BEGIN_SAPCHIEU,
  DATE_END_SAPCHIEU,
} from "../../../constants/config";
export function SampleNextArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowForwardIosRoundedIcon
      style={{ right: "-82px" }}
      onClick={onClick}
      className={classes.Arrow}
    />
  );
}
export function SamplePrevArrow(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <ArrowBackIosRoundedIcon
      style={{ left: "-82px" }}
      onClick={onClick}
      className={classes.Arrow}
    />
  );
}
const filterByDay = (eventList, tuNgay, denNgay) => {
  return eventList.filter((item) => {
    const timeItem = new Date(item.ngayKhoiChieu).getTime();
    const timeTuNgay = new Date(tuNgay).getTime();
    const timeDenNgay = new Date(denNgay).getTime();
    if (timeTuNgay <= timeItem && timeItem <= timeDenNgay) {
      return true;
    }
    return false;
  });
};

export default function SimpleTabs() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [value, setValue] = useState({ value: 0, fade: true, notDelay: 0 });
  const { errorEventList, eventList } = useSelector(
    (state) => state.eventReducer
  );
  const timeout = useRef(null);
  const [arrayData, setarrayData] = useState({
    dailyEventList: null,
    comingEventList: null,
  });
  const classes = useStyles({
    fade: value.fade,
    value: value.value,
    notDelay: value.notDelay,
  });
  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    let dailyEventList = filterByDay(
      eventList,
      DATE_BEGIN_DANGCHIEU,
      DATE_END_DANGCHIEU
    );
    dailyEventList = dailyEventList?.slice(dailyEventList.length - 16);
    let comingEventList = filterByDay(
      eventList,
      DATE_BEGIN_SAPCHIEU,
      DATE_END_SAPCHIEU
    );
    comingEventList = comingEventList?.slice(comingEventList.length - 16);
    setarrayData({ dailyEventList, comingEventList });
  }, [eventList]);

  const handleChange = (e, newValue) => {
    setValue((value) => ({ ...value, notDelay: newValue, fade: false }));
    timeout.current = setTimeout(() => {
      setValue((value) => ({ ...value, value: newValue, fade: true }));
    }, 100);
  };

  if (errorEventList) {
    return <div>{errorEventList}</div>;
  }

  return (
    <div style={{ paddingTop: "80px" }} id="lichchieu">
      <div className="tab-bar">
        <AppBar className={classes.appBar} position="static">
          <Tabs
            classes={{ root: classes.tabBar, indicator: classes.indicator }}
            value={value.value}
            onChange={handleChange}
          >
            <Tab
              disableRipple
              className={`${classes.tabButton} ${classes.tabDangChieu}`}
              label="showing EVENTS"
            />
          </Tabs>
        </AppBar>
      </div>
      <div className={classes.listEvent}>
        <Desktop arrayData={arrayData} value={value} />
      </div>
    </div>
  );
}
