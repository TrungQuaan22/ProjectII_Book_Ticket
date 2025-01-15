import { useEffect, useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

CheckIsMaSukienSetShowtime.propTypes = {
  maSukien: PropTypes.number.isRequired,
};
export default function CheckIsMaSukienSetShowtime(maSukien) {
  const [isMaSukienSetShowtime, setIsMaSukienSetShowtime] = useState(true);
  const url = `http://localhost:4000/api/QuanLySukien/LayThongTinSukien?MaSukien=${maSukien}`;
  useEffect(() => {
    let cancel = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await Axios.get(url, { cancelToken: cancel.token });
        const isMaSukienSetShowtime = false; //response && response.data && response.data.lichChieu && response.data.lichChieu.length > 0 ? true : false
        setIsMaSukienSetShowtime(isMaSukienSetShowtime);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("AxiosCancel: caught cancel");
        } else {
          throw error;
        }
      }
    };
    loadData();
    setTimeout(() => cancel.cancel(), 5000);
    return () => {
      cancel.cancel();
    };
  }, []);

  return isMaSukienSetShowtime;
}
