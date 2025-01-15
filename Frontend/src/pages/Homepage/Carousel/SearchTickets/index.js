import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomPopper from "./popper";
import "./style.css";
import theatersApi from "../../../../api/theatersApi";
import useStyles from "./styles";
import formatDate from "../../../../utilities/formatDate";
import { HIDDEN_SEARCHTICKET } from "../../../../constants/config";

export default function SearchStickets() {
  const { eventList: eventRender, errorEventList } = useSelector(
    (state) => state.eventReducer
  );
  const history = useHistory();
  const down992px = useMediaQuery(HIDDEN_SEARCHTICKET);
  const [data, setData] = useState({
    // handleSelectSukien
    setSukien: "",
    rapRender: [],
    cumRapChieuData: [],
    startRequest: false,
    errorCallApi: "",
    setRap: "",
    ngayChieuRender: [],
    lichChieuSukienData: [],

    setNgayXem: "",
    suatChieuRender: [],
    lichChieuSukienDataSelected: [],
    setSuatChieu: "",
    maLichChieu: "",
    openCtr: { sukien: false, rap: false, ngayXem: false, suatChieu: false },
    rootElementPopup: null,
  });
  const [topPopup, setTopPopup] = useState(false);
  const classes = useStyles({
    down992px,
    openSukien: data.openCtr.sukien || data.setSukien?.maSukien,
  });
  const [currentSukienPopup, setcurrentSukienPopup] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (!data.openCtr.sukien) {
      return undefined;
    }
    setTimeout(() => {
      const placementPopup = document.querySelector(
        'div[role="presentation"].MuiAutocomplete-popper'
      );
      if (placementPopup?.getAttribute("x-placement") === "bottom" && mounted) {
        setTopPopup(false);
      } else if (
        placementPopup?.getAttribute("x-placement") === "top" &&
        mounted
      ) {
        setTopPopup(true);
      }
      setData((data) => ({
        ...data,
        rootElementPopup: placementPopup,
      }));
    }, 50);
    return () => {
      mounted = false;
    };
  }, [data.openCtr.sukien]);

  const handleOpenSukien = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, sukien: true },
    }));
  };
  const handleOpenRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: true } }));
  };
  const handleOpenNgayXem = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayXem: true },
    }));
  };
  const handleOpenSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: true },
    }));
  };
  const handleCloseSukien = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, sukien: false },
    }));
  };
  const handleCloseRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: false } }));
  };
  const handleCloseNgayXem = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayXem: false },
    }));
  };
  const handleCloseSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: false },
    }));
  };
  const handleSelectSukien = (sukien) => {
    if (!sukien) {
      return undefined;
    }
    setData((data) => ({
      ...data,
      setSukien: sukien,
      startRequest: true,
      openCtr: { ...data.openCtr, rap: true },
      rapRender: [],
      cumRapChieuData: [],
      setRap: "",
      ngayChieuRender: [],
      lichChieuSukienData: [],
      setNgayXem: "",
      suatChieuRender: [],
      lichChieuSukienDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
    theatersApi
      .getThongTinLichChieuSukien(sukien.maSukien)
      .then((result) => {
        setData((data) => ({ ...data, startRequest: false }));
        const cumRapChieuData = result.data.heThongRapChieu.reduce(
          (colect, item) => {
            return [...colect, ...item.cumRapChieu];
          },
          []
        );
        const rapRender = cumRapChieuData.map((item) => item.tenCumRap);
        setData((data) => ({
          ...data,
          rapRender,
          cumRapChieuData,
        }));
      })
      .catch(function (error) {
        if (error.response) {
          setData((data) => ({ ...data, errorCallApi: error.response.data }));
        } else if (error.request) {
          setData((data) => ({ ...data, errorCallApi: error.message }));
        }
      });
  };
  const handleSelectRap = (e) => {
    setData((data) => ({
      ...data,
      setRap: e.target.value,
      openCtr: { ...data.openCtr, ngayXem: true },
      // reset
      ngayChieuRender: [],
      lichChieuSukienData: [],
      setNgayXem: "",
      suatChieuRender: [],
      lichChieuSukienDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
    const indexSelect = data.cumRapChieuData.findIndex(
      (item) => item.tenCumRap === e.target.value
    );
    const lichChieuSukienData =
      data.cumRapChieuData[indexSelect].lichChieuSukien;
    const ngayChieuRender = lichChieuSukienData.map((item) => {
      return item.ngayChieuGioChieu.slice(0, 10);
    });
    const ngayChieuRenderRemoveDuplicates = [...new Set(ngayChieuRender)];
    setData((data) => ({
      ...data,
      ngayChieuRender: ngayChieuRenderRemoveDuplicates,
      lichChieuSukienData,
    }));
  };
  const handleSelectNgayXem = (e) => {
    setData((data) => ({
      ...data,
      setNgayXem: e.target.value,
      openCtr: { ...data.openCtr, suatChieu: true },
      suatChieuRender: [],
      lichChieuSukienDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));

    const lichChieuSukienDataSelected = data.lichChieuSukienData.filter(
      (item) => {
        if (item.ngayChieuGioChieu.slice(0, 10) === e.target.value) {
          return true;
        }
        return false;
      }
    );
    const suatChieuRender = lichChieuSukienDataSelected.map((item) => {
      return item.ngayChieuGioChieu.slice(11, 16);
    });
    setData((data) => ({
      ...data,
      suatChieuRender,
      lichChieuSukienDataSelected,
    }));
  };
  const handleSelectSuatChieu = (e) => {
    setData((data) => ({
      ...data,
      setSuatChieu: e.target.value,
      // reset
      maLichChieu: "",
    }));
    const indexMaLichChieuSelect = data.lichChieuSukienDataSelected.findIndex(
      (item) => item.ngayChieuGioChieu.slice(11, 16) === e.target.value
    );
    const maLichChieu =
      data.lichChieuSukienDataSelected[indexMaLichChieuSelect].maLichChieu;
    setData((data) => ({ ...data, maLichChieu }));
  };

  const setNewSukien = (maSukien) => {
    setcurrentSukienPopup(maSukien);
  };
  const menuProps = {
    classes: { paper: classes.menu },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: topPopup ? "top" : "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: topPopup ? "bottom" : "top",
      horizontal: "left",
    },
  };

  if (errorEventList) {
    return <p>{errorEventList}</p>;
  }

  return (
    <div className="form-search responsive" style={{ marginTop: "200px" }}>
      <div className="input-group mb-3" id="searchTickets">
        <FormControl focused={false} className={classes.itemFirst}>
          <Autocomplete
            options={eventRender}
            getOptionLabel={(option) => option.tenSukien}
            style={{ width: 300 }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="--Select a event--"
                  variant="standard"
                  className={`${classes.textField}`}
                />
              );
            }}
            renderOption={(sukien) => (
              <CustomPopper
                key={sukien.tenSukien}
                sukien={sukien}
                setNewSukien={setNewSukien}
                currentSukienPopup={currentSukienPopup}
                rootElementPopup={data.rootElementPopup}
              />
            )}
            popupIcon={<ExpandMoreIcon />}
            value={data.setSukien ? data.setSukien : null}
            onChange={(event, sukien) => {
              handleSelectSukien(sukien);
            }}
            classes={{
              popupIndicator: classes.popupIndicator,
              option: classes.menu__item,
              listbox: classes.listbox,
              paper: classes.paper,
              noOptions: classes.noOptions,
            }}
            open={data.openCtr.sukien} // control open
            onClose={handleCloseSukien}
            onOpen={handleOpenSukien}
            blurOnSelect
            noOptionsText="Không tìm thấy"
          />
        </FormControl>

        <FormControl
          className={`${classes["search__item--next"]} ${classes.search__item}`}
          focused={false}
        >
          <Select
            open={data.openCtr.rap}
            onClose={handleCloseRap}
            onOpen={handleOpenRap}
            onChange={handleSelectRap}
            value={data.setRap} // tenCumRap
            renderValue={(value) => `${value ? value : "--select a theater--"}`} // hiển thị giá trị đã chọn
            displayEmpty
            IconComponent={ExpandMoreIcon}
            MenuProps={menuProps}
          >
            <MenuItem
              value=""
              style={{ display: data.rapRender.length > 0 ? "none" : "block" }}
              classes={{ root: classes.menu__item }}
            >
              {data.setSukien
                ? `${
                    data.startRequest
                      ? data.errorCallApi
                        ? data.errorCallApi
                        : "Đang tìm rạp"
                      : "Chưa có lịch chiếu, vui lòng chọn sukien khác"
                  }`
                : "Vui lòng chọn sukien"}
            </MenuItem>
            {data.rapRender.map((item) => (
              <MenuItem
                value={item}
                key={item}
                classes={{
                  root: classes.menu__item,
                  selected: classes["menu__item--selected"],
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={`${classes["search__item--next"]} ${classes.search__item}`}
          focused={false}
        >
          <Select
            open={data.openCtr.ngayXem}
            onClose={handleCloseNgayXem}
            onOpen={handleOpenNgayXem}
            onChange={handleSelectNgayXem}
            value={data.setNgayXem} // ngayChieu
            renderValue={(value) => `${value ? value : "--Select a date--"}`}
            displayEmpty
            IconComponent={ExpandMoreIcon}
            MenuProps={menuProps}
          >
            <MenuItem
              value=""
              style={{
                display: data.ngayChieuRender.length > 0 ? "none" : "block",
              }}
              classes={{ root: classes.menu__item }}
            >
              Vui lòng chọn sukien và rạp
            </MenuItem>
            {data.ngayChieuRender.map((ngayChieu) => (
              <MenuItem
                value={ngayChieu}
                key={ngayChieu}
                classes={{
                  root: classes.menu__item,
                  selected: classes["menu__item--selected"],
                }}
              >
                <div>{formatDate(ngayChieu).dayToday}</div>
                <div>{formatDate(ngayChieu).dateShort}</div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={`${classes["search__item--next"]} ${classes.search__item}`}
          focused={false}
        >
          <Select
            open={data.openCtr.suatChieu}
            onClose={handleCloseSuatChieu}
            onOpen={handleOpenSuatChieu}
            onChange={handleSelectSuatChieu}
            value={data.setSuatChieu} // suatChieu
            renderValue={(value) =>
              `${value ? value : "--Select a showtime--"}`
            }
            displayEmpty
            IconComponent={ExpandMoreIcon}
            MenuProps={menuProps}
          >
            <MenuItem
              value=""
              style={{
                display: data.suatChieuRender.length > 0 ? "none" : "block",
              }}
              classes={{ root: classes.menu__item }}
            >
              Vui lòng chọn sukien, rạp và ngày xem
            </MenuItem>
            {data.suatChieuRender.map((suatChieu) => (
              <MenuItem
                value={suatChieu}
                key={suatChieu}
                classes={{
                  root: classes.menu__item,
                  selected: classes["menu__item--selected"],
                }}
              >
                {suatChieu}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes["search__item--next"]}>
          <Button
            disabled={!data.maLichChieu} // khi không có dữ liệu > disabled cần set true
            classes={{
              root: classes.btn,
              disabled: classes.btnDisabled,
            }}
            onClick={() =>
              history.push(
                `/datve/${data.maLichChieu}`,
                `/datve/${data.maLichChieu}`
              )
            }
          >
            <div style={{ textAlign: "center" }}>BookTicket NOW</div>
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

SearchStickets.propTypes = {
  smDown: PropTypes.bool,
};
