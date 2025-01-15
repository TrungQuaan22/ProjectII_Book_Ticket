import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

export default function BtnGoToCheckout({ lichChieuTheoSukien }) {
  const classes = useStyles();
  const history = useHistory();

  const calculateTimeout = (ngayChieuGioChieu) => {
    const fakeThoiLuong = 120;
    const timeInObj = new Date(ngayChieuGioChieu);
    const timeOutObj = new Date(
      timeInObj.getTime() + fakeThoiLuong * 60 * 1000
    );
    return timeOutObj.toLocaleTimeString([], { hour12: false }).slice(0, 5);
  };

  return (
    <button
      className={classes.button}
      onClick={() =>
        history.push(
          `/datve/${lichChieuTheoSukien.maLichChieu}`,
          `/datve/${lichChieuTheoSukien.maLichChieu}`
        )
      }
    >
      <span className={classes.inTime}>
        {lichChieuTheoSukien.ngayChieuGioChieu.slice(11, 16)}
      </span>
      <span className={classes.outTime}>{` ~ ${calculateTimeout(
        lichChieuTheoSukien.ngayChieuGioChieu
      )}`}</span>
    </button>
  );
}
