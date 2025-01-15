import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import "./style.css";
import {
  getInfoUser,
  putUserUpdate,
  resetUserList,
} from "../../reducers/actions/UsersManagement";
import usersApi from "../../api/usersApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    color: "black",
    boxShadow: "none",
    "& .MuiTabs-indicator": {
      height: 0,
    },
  },
  field: {
    maxWidth: 500,
    paddingRight: 16,
    paddingLeft: 16,
  },
  password: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    top: 31,
    right: 9,
    cursor: "pointer",
  },
  tabButton: {
    opacity: 1,
    color: "#000",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    "& > span": {
      transition: "all 0.2s",
      "&:hover": {
        fontSize: "15px",
      },
    },
  },

  tabSelected: {
    color: "#fa5238",
  },
  td: {
    "& td": {
      whiteSpace: "nowrap",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index, isDesktop, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box style={{ padding: isDesktop ? "24px" : "24px 0px 0px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Index() {
  const history = useHistory;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const { successInfoUser, loadingInfoUser } = useSelector(
    (state) => state.usersManagementReducer
  );
  const { currentUser } = useSelector((state) => state.authReducer);
  console.log("User", currentUser?.soDt);
  const { commentList } = useSelector((state) => state.eventDetailReducer);
  const [dataShort, setdataShort] = useState({
    ticket: 0,
    posts: 0,
    likePosts: 0,
    total: 0,
  });
  const [dataVeDaDat, setDataVeDaDat] = useState([]);
  const { successUpdateUser, errorUpdateUser, loadingUpdateUser } = useSelector(
    (state) => state.usersManagementReducer
  );
  const [value, setValue] = React.useState(0);
  const [typePassword, settypePassword] = useState("password");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getInfoUser({ taiKhoan: currentUser?.taiKhoan }));

    usersApi.getDanhSachVeDaDat(currentUser?.taiKhoan).then((result) => {
      setDataVeDaDat(result.data);
      console.log("VE", result.data);
    });

    return () => dispatch(resetUserList());
  }, []);
  useEffect(() => {
    if (commentList) {
      const { posts, likePosts } = commentList.reduce(
        (obj, post) => {
          let posts = obj.posts;
          let likePosts = obj.likePosts;
          if (post.avtId === currentUser.taiKhoan) {
            posts++;
            likePosts += post.userLikeThisComment.length;
          }
          return { ...obj, posts, likePosts };
        },
        { posts: 0, likePosts: 0 }
      );
      setdataShort((data) => ({ ...data, posts, likePosts }));
    }
    if (successInfoUser) {
    }
  }, [commentList, successInfoUser]);
  useEffect(() => {
    if (successUpdateUser) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [successUpdateUser]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const updateUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("*Tài khoản không được bỏ trống !"),
    matKhau: yup.string().required("*Mật khẩu không được bỏ trống !"),
    email: yup
      .string()
      .required("*Email không được bỏ trống !")
      .email("* Email không hợp lệ "),
    soDt: yup
      .string()
      .required("*Số điện thoại không được bỏ trống !")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
    hoTen: yup.string().required("*Tên không được bỏ trống !"),
  });

  const handleSubmit = (user) => {
    if (loadingUpdateUser) {
      return;
    }
    dispatch(putUserUpdate(user));
  };
  const handleToggleHidePassword = () => {
    if (typePassword === "password") {
      settypePassword("text");
    } else {
      settypePassword("password");
    }
  };
  const getIdSeat = (danhSachGhe) => {
    return danhSachGhe
      .reduce((listSeat, seat) => {
        return [...listSeat, seat.tenGhe];
      }, [])
      .join(", ");
  };

  const handleDeleteTicket = (maGhe, taiKhoanNguoiDat) => {
    console.log("delete");
    usersApi.deleteTicketOfUser({
      maGhe: maGhe,
      taiKhoanNguoiDat: taiKhoanNguoiDat,
    });
    window.location.reload();
  };
  return (
    <div className="container rounded mb-5">
      <div className="row bg-white">
        <div className="col-md-12">
          <div className="table-responsive">
            {" "}
            {/* Thêm lớp table-responsive */}
            <table className="table">
              <tr>
                <th>Tên Sukien</th>
                <th>Địa chỉ</th>
                <th>Ngày chiếu</th>
                <th>Ghế</th>
                <th>Loại ghế</th>
                <th>Giá vé</th>
                <th style={{ width: "100px" }}>Trạng Thái</th>
                <th></th>
              </tr>
              <tbody>
                {dataVeDaDat.map((item) => (
                  <tr key={item.maVe}>
                    <td>{item.tenSukien}</td>
                    <td>{item.diaChi}</td>
                    <td>{item.ngayChieu}</td>
                    <td>{item.tenDayDu}</td>
                    <td>{item.loaiGhe}</td>
                    <td>{item.giaVe}</td>
                    <td>
                      {item.status ? (
                        <span className="badge bg-success">Đã thanh toán</span>
                      ) : (
                        <span className="badge bg-warning">
                          Chưa thanh toán
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTicket(item.maVe)}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
