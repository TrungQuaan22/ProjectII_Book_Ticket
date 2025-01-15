import axiosClient from "./axiosClient";

const usersApi = {
  postDangKy: (user) => {
    const path = "/QuanLyNguoiDung/DangKy";
    return axiosClient.post(path, user);
  },
  postDangNhap: (user) => {
    const path = "/QuanLyNguoiDung/DangNhap";
    return axiosClient.post(path, user);
  },

  getThongTinTaiKhoan: (info) => {
    const path = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(path, info);
  },

  getDanhSachVeDaDat: (taiKhoanNguoiDat) => {
    const path = `/QuanLyDatVe/LayDanhSachVeDaMua?taiKhoanNguoiDat=${taiKhoanNguoiDat}`;
    return axiosClient.get(path);
  },

  getVe: (taiKhoanNguoiDat, maGhe) => {
    const path = `/QuanLyDatVe/LayVeTheoMaGhe?taiKhoanNguoiDat=${taiKhoanNguoiDat}&maGhe=${maGhe}`;
    return axiosClient.get(path);
  },

  createPaymentUrl: (
    amount,
    maLichChieu,
    danhSachVe,
    taiKhoanNguoiDung,
    paymentMethod
  ) => {
    const path = "/create_payment_url";
    const params = {
      paymentMethod: paymentMethod,
      amount: amount,
      maLichChieu: maLichChieu,
      taiKhoanNguoiDung: taiKhoanNguoiDung,
    };
    const danhSachVeArray = Array.isArray(danhSachVe) ? danhSachVe : [];
    danhSachVeArray.forEach((value, index) => {
      params[`danhSachVe[${index}]`] = value;
    });

    return axiosClient.get(path, { params });
  },
};

export default usersApi;
