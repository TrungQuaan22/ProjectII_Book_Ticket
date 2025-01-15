import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";
import useStyles from "./style";
import formatDate from "../../../utilities/formatDate";
import useApiThoiLuongDanhGia from "../../../utilities/useApiThoiLuongDanhGia";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../reducers/constants/ModalTrailer";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const play = "/img/carousel/play-video.png";

export default function Desktop({ eventDetailShowtimes: data, isMobile }) {
  const history = useHistory()
  const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
  const param = useParams();
  const [quantityComment, setQuantityComment] = useState(0);
  const { thoiLuong, danhGia } = useApiThoiLuongDanhGia(param.maSukien);
  const classes = useStyles({ bannerImg: data?.hinhAnh });
  const [imagePage404, setImagePage404] = useState(false);
  let location = useLocation();



  const onIncreaseQuantityComment = (value) => {
    setQuantityComment(value);
  };

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        open: true,
        urlYoutube: data.trailer,
      },
    });
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div
            className="items"
            style={{
              height: "300px",
              width: "500px",
              margin: "50px 50px 50px 50px",
            }}
          >
            <img
              src={data.hinhAnh}
              alt="poster"
              className="img-fluid"
              onError={(e) => {
                e.target.onerror = null;
                setImagePage404(true);
              }}
            />
            {imagePage404 && <div className={classes.withOutImage}></div>}
          </div>
        </div>
        <div className="col-lg-6 content">
          <div className="">
          <div className="row">
              <p className="col-lg-3">Chương trình</p>
              <p className="col-lg-9"> {data?.tenSukien} </p>
            </div>
            <div className="row">
              <p className="col-lg-3">Ngày biểu diễn</p>
              <p className="col-lg-9">
                {formatDate(data.ngayBieuDien?.slice(0, 10)).YyMmDd}
              </p>
            </div>
            <div className="row">
              <p className="col-lg-3">Tổng Đạo diễn</p>
              <p className="col-lg-9"> {data?.daoDien} </p>
            </div>
            <div className="row">
              <p className="col-lg-3">Ngôi sao</p>
              <p className="col-lg-9">{data?.ngoiSao}</p>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <p className="">Giới thiệu</p>
              </div>
              <div className="col-lg-9">
                <p>{data.moTa}</p>
              </div>
            </div>
            <div className={classes.shortInfo}>
              <button className={classes.btnMuaVe} onClick={() => history.push(`/datve/${data.maLichChieu}`)}>
                {location.state?.comingEvent ? "Thông tin sukien" : "Mua vé"}
              </button>
              <button className={classes.btnMuaVe} onClick={() => openModal()}>
                {location.state?.comingEvent ? "Thông tin sukien" : "Xem demo"}
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
