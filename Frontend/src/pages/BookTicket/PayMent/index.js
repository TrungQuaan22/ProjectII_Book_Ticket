import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import useStyles from "./style";
import formatDate from "../../../utilities/formatDate";
import { BookTicket } from "../../../reducers/actions/BookTicket";
import {
  SET_DATA_PAYMENT,
  SET_READY_PAYMENT,
} from "../../../reducers/constants/BookTicket";
import usersApi from "../../../api/usersApi";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";

const makeObjError = (name, value, dataSubmit) => {
  let newErrors = {
    ...dataSubmit.errors,
    [name]:
      value?.trim() === ""
        ? `${name.charAt(0).toUpperCase() + name.slice(1)} không được bỏ trống`
        : "",
  };
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexNumber =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  if (name === "email" && value) {
    if (!regexEmail.test(value)) {
      newErrors[name] = "Email không đúng định dạng";
    }
  }
  if (name === "phone" && value) {
    if (!regexNumber.test(value)) {
      newErrors[name] = "Phone không đúng định dạng";
    }
  }
  if (name === "address" && value) {
    if (value.length < 5) {
      newErrors[name] = "Địa chỉ phải có ít nhất 5 ký tự";
    }
  }
  return newErrors;
};

export default function PayMent() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.authReducer);
  console.log("SĐT", currentUser?.soDt);
  const location = useLocation();
  const {
    listSeat,
    amount,
    email,
    phone,
    paymentMethod,
    isReadyPayment,
    isMobile,
    danhSachVe,
    danhSachPhongVe: { thongTinSukien },
    maLichChieu,
    taiKhoanNguoiDung,
    isSelectedSeat,
    listSeatSelected,
    loadingBookTicketTicket,
    successBookTicketTicketMessage,
    errorBookTicketMessage,
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const phoneRef = useRef(currentUser?.soDt);
  const addressRef = useRef();
  let variClear = useRef("");
  console.log("Phone", phone, phoneRef);
  const [dataFocus, setDataFocus] = useState({ phone: false, email: false });
  const [dataSubmit, setdataSubmit] = useState({
    values: {
      email: email,
      phone: phone,
      paymentMethod: paymentMethod,
      address: "",
    },
    errors: {
      email: "",
      phone: "",
      address: "",
    },
  });
  const classes = useStyles({
    isSelectedSeat,
    isReadyPayment,
    isMobile,
    dataFocus,
    dataSubmit,
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...dataSubmit.values, [name]: value };
    let newErrors = makeObjError(name, value, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: newValues,
      errors: newErrors,
    }));
  };
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setdataSubmit((prevData) => ({
      ...prevData,
      values: {
        ...prevData.values,
        paymentMethod: value,
      },
    }));
  };

  useEffect(() => {
    clearTimeout(variClear);
    variClear.current = setTimeout(() => {
      dispatch({
        type: SET_DATA_PAYMENT,
        payload: {
          email: dataSubmit.values.email,
          phone: dataSubmit.values.phone,
          paymentMethod: dataSubmit.values.paymentMethod,
          address: dataSubmit.values.address, // Thêm address vào payload
        },
      });
      if (
        !dataSubmit.errors.email &&
        !dataSubmit.errors.phone &&
        !dataSubmit.errors.address && // Kiểm tra lỗi địa chỉ
        dataSubmit.values.email &&
        dataSubmit.values.phone &&
        dataSubmit.values.paymentMethod &&
        dataSubmit.values.address && // Đảm bảo address không trống khi thanh toán COD
        isSelectedSeat
      ) {
        dispatch({
          type: SET_READY_PAYMENT,
          payload: { isReadyPayment: true },
        });
      } else {
        dispatch({
          type: SET_READY_PAYMENT,
          payload: { isReadyPayment: false },
        });
      }
    }, 500);
    return () => clearTimeout(variClear.current);
  }, [dataSubmit, isSelectedSeat]);

  useEffect(() => {
    let emailErrors = makeObjError(emailRef.current.name, email, dataSubmit);
    let phoneErrors = makeObjError(phoneRef.current.name, phone, dataSubmit);
    setdataSubmit((dataSubmit) => ({
      ...dataSubmit,
      values: {
        email: email,
        phone: phone,
        paymentMethod: paymentMethod,
      },
      errors: { email: emailErrors.email, phone: phoneErrors.phone },
    }));
  }, [listSeat]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionStatus = searchParams.get("vnp_TransactionStatus");
    console.log("STATUS", transactionStatus);

    // The vnp_TransactionStatus parameter is set
    console.log("Transaction Status:", transactionStatus);

    const danhSachVe = [];
    searchParams.forEach((value, key) => {
      if (key.startsWith("danhSachVe")) {
        const index = key.match(/\[(\d+)\]/)[1];
        danhSachVe[index] = JSON.parse(value);
      }
    });

    // Call additional functions or perform actions based on the transaction status
    if (transactionStatus) {
      console.log("STATUS 2", transactionStatus);
      const taiKhoanNguoiDung = searchParams.get("taiKhoanNguoiDung");
      const maLichChieu = searchParams.get("maLichChieu");
      const amount = searchParams.get("vnp_Amount");
      const tenSukien = thongTinSukien?.tenSukien;
      console.log('amount', amount);
      console.log("Ma Lich Chieu:", maLichChieu);
      console.log("Tai Khoan: ", taiKhoanNguoiDung);
      console.log("Danh sach ve: ", danhSachVe);
      dispatch(
        BookTicket({
          paymentMethod: "online",
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung,
          amount,
          tenSukien,
        })
      );
    }
  }, [location.search, dispatch]);

  const handleBookTicket = () => {
    console.log("Danh Sach Ve", danhSachVe);

    if (danhSachVe.length == 0) {
      alert("Bạn chưa chọn vé nào !");
      return;
    }

    // Kiểm tra nếu phương thức thanh toán là COD và địa chỉ trống
    if (
      dataSubmit.values.paymentMethod === "COD" &&
      !dataSubmit.values.address
    ) {
      alert("Địa chỉ không được bỏ trống khi thanh toán khi nhận hàng.");
      return;
    }

    if (dataSubmit.values.paymentMethod === "online") {
      usersApi
        .createPaymentUrl(
          amount,
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung
        )
        .then((result) => {
          console.log(result.data);
          window.location.href = result.data;
        })
        .catch();
    } else {
      dispatch(
        BookTicket({
          paymentMethod: "COD",
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung,
          amount,
          address: dataSubmit.values.address,
        })
      );
    }
  };

  const onFocus = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: true });
  };
  const onBlur = (e) => {
    setDataFocus({ ...dataFocus, [e.target.name]: false });
  };

  console.log("Số điện thoại", dataSubmit);

  return (
    <aside className={`container ${classes.payMent}`}>
      <div className="row">
        <div className="col-md-12">
          <p className={`${classes.amount} ${classes.payMentItem}`}>
            {`${amount.toLocaleString("vi-VI")} đ`}
          </p>
        </div>
        <div className="col-md-12">
          <div className={classes.payMentItem}>
            <p className={classes.tenSukien}>{thongTinSukien?.tenSukien}</p>
            <p>{thongTinSukien?.tenCumRap}</p>
            <p>{`${thongTinSukien?.tenRap}`}</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className={`${classes.seatInfo} ${classes.payMentItem}`}>
            <span>{`Ghế ${listSeatSelected?.join(", ")}`}</span>
            <p className={classes.amountLittle}>
              {`${amount.toLocaleString("vi-VI")} đ`}
            </p>
          </div>
        </div>
        <div className="col-md-12">
          <div className={classes.payMentItem}>
            <label className={classes.labelEmail}>E-Mail</label>
            <input
              type="text"
              name="email"
              ref={emailRef}
              onFocus={onFocus}
              onBlur={onBlur}
              value={dataSubmit.values.email}
              className={classes.fillInEmail}
              onChange={onChange}
              autoComplete="off"
            />
            <p className={classes.error}>{dataSubmit.errors.email}</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className={classes.payMentItem}>
            <label className={classes.labelPhone}>Phone</label>
            <br />
            <input
              type="number"
              name="phone"
              ref={phoneRef}
              onFocus={onFocus}
              onBlur={onBlur}
              value={currentUser?.soDt}
              className={classes.fillInPhone}
              onChange={onChange}
              autoComplete="off"
            />
            <p className={classes.error}>{dataSubmit.errors.phone}</p>
          </div>
        </div>
        {dataSubmit.values.paymentMethod === "COD" && (
          <div className="col-md-12">
            <div className={classes.payMentItem}>
              <label className={classes.label}>
                Địa chỉ <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                ref={addressRef}
                value={dataSubmit.values.address}
                className={classes.fillIn}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                autoComplete="off"
                placeholder="Nhập địa chỉ của bạn"
              />
              <p className={classes.error}>{dataSubmit.errors.address}</p>
            </div>
          </div>
        )}
        <div className="col-md-12">
          <div className={classes.payMentItem}>
            <label>Phương thức thanh toán</label>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={dataSubmit.values.paymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
              />
              <label>Thanh toán khi nhận hàng</label>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={dataSubmit.values.paymentMethod === "online"}
                  onChange={handlePaymentMethodChange}
                  style={{ color: "white" }}
                />
                <label>Thanh toán online</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <button
            className={`${classes.btnDV} btn btn-primary`}
            // disabled={!isReadyPayment}
            onClick={handleBookTicket}
          >
            Đặt Vé
          </button>
        </div>
        <div className="col-md-12">
          <a href="/">
            <button
              type="button"
              className={`${classes.btnDV} btn btn-primary`}
            >
              Quay lại trang chủ →
            </button>
          </a>
        </div>
      </div>
    </aside>
  );
}
