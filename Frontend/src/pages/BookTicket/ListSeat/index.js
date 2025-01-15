import React, { useRef, useEffect, useState } from "react";

import SeatIcon from "@material-ui/icons/CallToActionRounded";
import { useSelector, useDispatch } from "react-redux";
import Countdown from "../Countdown";

import useStyles from "./style";

import {
  CHANGE_LISTSEAT,
  SET_ALERT_OVER10,
} from "../../../reducers/constants/BookTicket";
import { format, parse, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export default function ListSeat() {
  const {
    isMobile,
    listSeat,
    danhSachPhongVe: { thongTinSukien },
  } = useSelector((state) => state.BookTicketReducer);
  const domToSeatElement = useRef(null);
  const [widthSeat, setWidthSeat] = useState(0);
  const classes = useStyles({
    color: "red",
    modalLeftImg: thongTinSukien?.hinhAnh,
    isMobile,
    widthLabel: widthSeat / 2,
  });
  const dispatch = useDispatch();

  const [topping, setTopping] = useState(0);

  const handleChange = (event) => {
    setTopping(event.target.value);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    handleResize();
  }, [listSeat]);
  const handleResize = () => {
    setWidthSeat(domToSeatElement?.current?.offsetWidth);
  };

  const handleSelectedSeat = (seatSelected) => {
    if (seatSelected.daDat) {
      return;
    }
    let newListSeat = listSeat.map((seat) => {
      if (seatSelected.maGhe === seat.maGhe) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    });
    const newListSeatSelected = newListSeat?.reduce(
      (newListSeatSelected, seat) => {
        if (seat.selected) {
          return [...newListSeatSelected, seat.label];
        }
        return newListSeatSelected;
      },
      []
    );
    if (newListSeatSelected.length === 11) {
      dispatch({
        type: SET_ALERT_OVER10,
      });
      return;
    }
    const danhSachVe = newListSeat?.reduce((danhSachVe, seat) => {
      if (seat.selected) {
        return [
          ...danhSachVe,
          { maGhe: seat.maGhe, tenDayDu: seat.label, giaVe: seat.giaVe },
        ];
      }
      return danhSachVe;
    }, []);
    const isSelectedSeat = newListSeatSelected.length > 0 ? true : false;
    const amountWithTopping = newListSeat?.reduce((totalAmount, seat) => {
      if (seat.selected) {
        return totalAmount + seat.giaVe;
      }
      return totalAmount;
    }, 0);

    const amount = (
      parseInt(amountWithTopping, 10) + parseInt(topping, 10)
    ).toString();
    dispatch({
      type: CHANGE_LISTSEAT,
      payload: {
        listSeat: newListSeat,
        isSelectedSeat,
        listSeatSelected: newListSeatSelected,
        danhSachVe,
        amount,
      },
    });
  };
  const color = (seat) => {
    let color;
    if (seat.loaiGhe === "Thuong") {
      color = "#3e515d";
    }
    if (seat.loaiGhe === "Vip") {
      color = "#f7b500";
    }
    if (seat.selected) {
      color = "#44c020";
    }
    if (seat.daDat) {
      color = "#99c5ff";
    }
    return color;
  };

  const ngayChieu = thongTinSukien?.gioChieu;
  console.log(ngayChieu);
  let thu = "";

  if (ngayChieu) {
    const parsedDate = parse(ngayChieu, "dd/MM/yyyy HH:mm:ss", new Date());
    console.log(parsedDate);

    if (isValid(parsedDate)) {
      thu = format(parsedDate, "EEEE", { locale: vi });
    }
  }

  return (
    <main className={classes.listSeat}>
      <div className={classes.info_CountDown}>
        <div className={classes.infoTheater}>
          <img
            src={
              thongTinSukien?.hinhAnh ||
              "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/473583110_1140881264704578_7733040016086108576_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHL5-ag_jnOPCE17jSd6SRLIQPBm7UN6CohA8GbtQ3oKuyT95Y6Sx84QTZ4AU4V1hzhAkDMCP2tTeLTWvcqGUnb&_nc_ohc=Y6Rrl1bpOLgQ7kNvgEL-wS0&_nc_oc=AdhELCQ8qGW1Foc702bJkki3pOyhgW7S2lt_BvljU6GAmMueqYn2lIJk4-CGnY1MQU9JPRlJ-UHAF6AsEeZHcL5k&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=At_trMZiODOglGl2iyvl1pC&oh=00_AYBn3m__FzrGh-hNLoVhxuhSDasZdgTYhw-Fk0xR7zDzlQ&oe=678CD9B0"
            }
            alt="Storii"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <div className={classes.text}>
            <p>HUSTICKET</p>
            <p className={classes.textTime}>NHÀ HÁT BÁCH KHOA</p>
          </div>
        </div>
        <div className={classes.countDown}>
          <p className={classes.timeTitle}>Thời gian giữ ghế</p>
          <Countdown />
        </div>
      </div>

      <div className={classes.overflowSeat}>
        <div className={classes.invariantWidth}>
          <div className={classes.seatSelect}>
            {listSeat?.map((seat, i) => (
              <div
                className={classes.seat}
                key={seat.maGhe}
                ref={domToSeatElement}
              >
                {(i === 0 || i % 16 === 0) && (
                  <p className={classes.label}>{seat.label.slice(0, 1)}</p>
                )}
                {seat.selected && (
                  <p className={classes.seatName}>
                    {Number(seat.label.slice(1)) < 10
                      ? seat.label.slice(2)
                      : seat.label.slice(1)}
                  </p>
                )}
                {seat.daDat && (
                  <img
                    className={classes.seatLocked}
                    src="/img/BookTicket/notchoose.png"
                    alt="notchoose"
                  />
                )}
                <SeatIcon
                  style={{ color: color(seat) }}
                  className={classes.seatIcon}
                />

                <div
                  className={classes.areaClick}
                  onClick={() => handleSelectedSeat(seat)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.noteSeat}>
        <div className={classes.typeSeats}>
          <div>
            <SeatIcon style={{ color: "#3e515d", fontSize: 27 }} />
            <p>Ghế thường</p>
          </div>
          <div>
            <SeatIcon style={{ color: "#f7b500", fontSize: 27 }} />
            <p>Ghế vip</p>
          </div>
          <div>
            <SeatIcon style={{ color: "#44c020", fontSize: 27 }} />
            <p>Ghế đang chọn</p>
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <p className={classes.posiX}>x</p>
              <SeatIcon style={{ color: "#99c5ff", fontSize: 27 }} />
            </div>
            <p>Ghế đã được mua</p>
          </div>
        </div>
      </div>
    </main>
  );
}
