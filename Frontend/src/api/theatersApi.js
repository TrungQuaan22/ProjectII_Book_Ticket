import axiosClient from "./axiosClient";
const theatersApi = {
  getThongTinLichChieuSukien: (maSukien) => {
    const path = `/QuanLyNhaHat/LayThongTinLichChieuSukien?MaSukien=${maSukien}`;
    return axiosClient.get(path);
  },
};

export default theatersApi;
