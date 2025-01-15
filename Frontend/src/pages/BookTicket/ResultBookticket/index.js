import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import useStyles from "./style";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function ResultBookTicket() {
  const location = useLocation();
  const {
    isMobile,
    amount,
    email,
    phone,
    paymentMethod,
    listSeatSelected,
    successBookTicketTicketMessage,
    errorBookTicketMessage,
    danhSachPhongVe: { thongTinSukien },
    danhSachVe,
    amount : TongTien
  } = useSelector((state) => state.BookTicketReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  const classes = useStyles({
    thongTinSukien,
    color: 'red',
    isMobile,
  });
  const [ghe, setGhe] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionStatus = searchParams.get("vnp_TransactionStatus");
    const total = searchParams.get("vnp_Amount");
    setTotal(total / 100);
    console.log("STATUS", transactionStatus);

    // The vnp_TransactionStatus parameter is set
    console.log("Transaction Status:", transactionStatus);


    searchParams.forEach((value, key) => {
      if (key.startsWith("danhSachVe")) {
        const index = key.match(/\[(\d+)\]/)[1];
        danhSachVe[index] = JSON.parse(value);
      }
    });

    const extractedGhe = danhSachVe.map((ve) => ve.tenDayDu);
    setGhe(extractedGhe);
  }, [location.search]);
  return (
    <div className={classes.resultBookTicket}>
      <div className={classes.infoTicked}>
        <div className={classes.infoTicked__img}></div>
        <div className={classes.infoTicked__txt}>
          <p className={classes.tenSukien}>{thongTinSukien?.tenSukien}</p>
          <p className={classes.text__first}>
            <span className={classes.text__second}>
            </span>
          </p>
          <p className={classes.diaChi}>{thongTinSukien?.diaChi}</p>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td valign="top">Thời gian bắt đầu:</td>
                <td valign="top"> {`${thongTinSukien?.ngayChieu}`}</td>
              </tr>
              <tr>
                <td valign="top">Ghế:</td>
                <td>{ghe.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <h3 className={classes.infoResult_label}>Thông tin đặt vé</h3>
          <table className={`${classes.table} table`}>
            <tbody>
              <tr>
                <td valign="top">Họ tên:</td>
                <td>{currentUser?.hoTen}</td>
              </tr>
              <tr>
                <td valign="top">Điện thoại:</td>
                <td valign="top">{currentUser?.soDt}</td>
              </tr>
              <tr>
                <td valign="top">Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td valign="top">Trạng thái:</td>
                <td>
                  {successBookTicketTicketMessage && (
                    <span>
                      Đặt vé thành công qua{" "}
                      <span className={classes.paymentColor}>
                        {paymentMethod}
                      </span>
                    </span>
                  )}
                  {errorBookTicketMessage && (
                    <span>
                      Đặt vé thất bại:{" "}
                      <span className={classes.errorColor}>
                        {errorBookTicketMessage}
                      </span>
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td valign="top">Tổng tiền:</td>
                <td valign="top">
                  <span>{`${TongTien?.toLocaleString("vi-VI")} đ`}</span>
                </td>
              </tr>
            </tbody>
          </table>
          {successBookTicketTicketMessage && (
            <p className={classes.noteresult}>
              Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
