import axiosClient from "./axiosClient";
const eventsApi = {
  getDanhSachSukien: () => {
    const path = "/QuanLySukien/LayDanhSachSukien";
    return axiosClient.get(path);
  },
  getThongTinSukien: (maSukien) => {
    const path = `/QuanLySukien/LayThongTinSukien?MaSukien=${maSukien}`;
    return axiosClient.get(path);
  },

};

export default eventsApi;
