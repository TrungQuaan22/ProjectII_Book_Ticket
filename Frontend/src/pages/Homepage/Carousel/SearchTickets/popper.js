import React, { useEffect, useState } from "react";
import Popper from "@material-ui/core/Popper";
import { useHistory } from "react-router-dom";
export default function CustomPopper(props) {
  const { sukien, setNewSukien, currentSukienPopup, rootElementPopup } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPopper, setShowPopper] = useState(false);
  const [widthImage, setwidthImage] = useState(200);
  const temporaryAnchorEl = React.useRef(null);
  const history = useHistory();
  const [imagePage404, setImagePage404] = useState(false);
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = sukien.hinhAnh;
    img.onload = function () {
      if (this.width > this.height && mounted) {
        setwidthImage(350);
      } else if (this.width === this.height && mounted) {
        setwidthImage(250);
      }
    };
    setAnchorEl(temporaryAnchorEl.current);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (sukien.maSukien !== currentSukienPopup && currentSukienPopup) {
      setShowPopper(false);
    }
  }, [currentSukienPopup, sukien.maSukien]);
  const handleMouseEnter = (element) => {
    setNewSukien(sukien.maSukien);
    setShowPopper(true);
    setAnchorEl(rootElementPopup);
  };

  return (
    <div className="" onMouseEnter={handleMouseEnter} ref={temporaryAnchorEl}>
      <p>{sukien.tenSukien}</p>
      {showPopper && (
        <Popper
          open={showPopper}
          anchorEl={anchorEl}
          className=""
          placement="right"
        >
          <div>
            <div style={{ position: "relative" }}>
              <img
                src={sukien.hinhAnh}
                alt="poster"
                className=""
                style={{ width: widthImage }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  setImagePage404(true);
                }}
              />
              {imagePage404 && <div className=""></div>}
              <div className="">
                <p>{`120 phút - Điểm Tix ${sukien.danhGia}`}</p>
              </div>
              <button
                className=""
                onClick={() => history.push(`/datve/${sukien.maSukien}`)}
              >
                Chi tiêt sukien
              </button>
            </div>
          </div>
        </Popper>
      )}
    </div>
  );
}
