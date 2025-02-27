import React from "react";

import { Link, useHistory } from "react-router-dom";

import BtnPlay from "../../../../../components/BtnPlay";
import useStyles from "./styles";
import useApiThoiLuongDanhGia from "../../../../../utilities/useApiThoiLuongDanhGia";

import "./event.css";

function EventItem({ event, comingEvent }) {
  const classes = useStyles({ bg: event.hinhAnh, comingEvent });
  const history = useHistory();
  const { thoiLuong } = useApiThoiLuongDanhGia(event.maSukien);
  return (
    <div
      style={{
        padding: "15px",
        cursor: "pointer",
      }}
    >
      <div className="film">
        <div className="film__img">
          <div className={`film__poster ${classes.addbg}`}>
            <div
              className="film__overlay"
              onClick={() =>
                history.push(`/detail/${event.maSukien}`, { comingEvent })
              }
            />
            <div className="play__trailer">
              <BtnPlay
                cssRoot={"play"}
                width={48}
                height={48}
                urlYoutube={event.trailer}
              />
            </div>
          </div>
        </div>
        <div className="film__content">
          <div className={`film__name ${thoiLuong ? "" : "not_hide"}`}>
            <div className="name">
              <p>
                <span className="c18">C18</span>
                {event.tenSukien}
              </p>
            </div>
            <p className="pt-2">
              {thoiLuong ? (
                <span className="text_info">
                  {thoiLuong} phút - {event.danhGia}
                </span>
              ) : (
                <span className="text_info">{event.danhGia}</span>
              )}
            </p>
          </div>
          <div className={`film__button`}>
            {(thoiLuong || comingEvent) && (
              <Link
                style={{
                  background: comingEvent ? "#60c5ef" : "rgb(238, 130, 59)",
                }}
                to={{
                  pathname: `/datve/${event.maSukien}`,
                  state: { comingEvent },
                }}
              >
                {comingEvent ? "THÔNG TIN SUKIEN" : "MUA VÉ"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventItem;
