import { createSelector } from "reselect";
import formatDate from "../../utilities/formatDate";
const selectMobileData = createSelector(
  (state) => state.eventDetailReducer,
  (eventDetailReducer) => {
    const isEmptyData =
      eventDetailReducer.eventDetailShowtimes.heThongRapChieu?.length === 0;
    const heThongRapChieu =
      eventDetailReducer.eventDetailShowtimes.heThongRapChieu;
    const arrayAllLichChieuSukienAddProp = heThongRapChieu?.reduce(
      (colect1, heThongRapChieuItem) => {
        return [
          ...colect1,
          ...heThongRapChieuItem.cumRapChieu?.reduce(
            (colect2, cumRapChieuItem) => {
              return [
                ...colect2,
                ...cumRapChieuItem.lichChieuSukien?.reduce(
                  (colect3, lichChieuSukienItem) => {
                    return [
                      ...colect3,
                      {
                        ...lichChieuSukienItem,
                        tenHeThongRap: heThongRapChieuItem.tenHeThongRap,
                        tenCumRap: cumRapChieuItem.tenCumRap,
                        logo: heThongRapChieuItem.logo,
                      },
                    ];
                  },
                  []
                ),
              ];
            },
            []
          ),
        ];
      },
      []
    );

    const arrayDay = [
      ...new Set(
        arrayAllLichChieuSukienAddProp?.map((item) =>
          item.ngayChieuGioChieu?.slice(0, 10)
        )
      ),
    ].sort();
    const arrayHeThongRapChieuFilterByDay = arrayDay.map((date) => {
      const arrayLichChieuSukienFilterByDay =
        arrayAllLichChieuSukienAddProp.filter(
          (item) => item.ngayChieuGioChieu.slice(0, 10) === date
        );

      const arrayHeThongRapRemoveDup = arrayLichChieuSukienFilterByDay?.filter(
        (itemIncrease, indexIncrease, arr) =>
          indexIncrease ===
          arr.findIndex((t) => t.tenHeThongRap === itemIncrease.tenHeThongRap)
      );
      const arrayHeThongRapItem = arrayHeThongRapRemoveDup.map(
        (heThongRapItem) => {
          const arrayLichChieuSukienFilterByHeThongRap =
            arrayLichChieuSukienFilterByDay?.filter(
              (item) => item.tenHeThongRap === heThongRapItem.tenHeThongRap
            );
          const arrayCumRapChieuRemoveDup =
            arrayLichChieuSukienFilterByHeThongRap?.filter(
              (itemIncrease, indexIncrease, arr) =>
                indexIncrease ===
                arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap)
            );

          const cumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
            const lichChieuSukien =
              arrayLichChieuSukienFilterByHeThongRap.filter(
                (lichChieuSukien) =>
                  lichChieuSukien.tenCumRap === cumRapChieu.tenCumRap
              );
            return {
              tenCumRap: cumRapChieu.tenCumRap,
              maLichChieu: cumRapChieu.maLichChieu,
              lichChieuSukien,
            };
          });
          return {
            tenHeThongRap: heThongRapItem.tenHeThongRap,
            logo: heThongRapItem.logo,
            cumRapChieu,
          };
        }
      );

      return { date, heThongRap: arrayHeThongRapItem };
    });
    return { arrayHeThongRapChieuFilterByDay, isEmptyData };
  }
);

const selectDesktopData = (currentSelectedHeThongRapChieu) => {
  const arrayAllLichChieuSukien =
    currentSelectedHeThongRapChieu.cumRapChieu.reduce((colect, item) => {
      return [
        ...colect,
        ...item.lichChieuSukien.map((lichChieu) => ({
          ...lichChieu,
          tenCumRap: item.tenCumRap,
        })),
      ];
    }, []);

  const arrayAllDay = arrayAllLichChieuSukien.map((item) => {
    return item.ngayChieuGioChieu.slice(0, 10);
  });
  const arrayDay = [...new Set(arrayAllDay)].sort(); // xóa đi phần tử trùng lặp

  const allArrayCumRapChieuFilterByDay = arrayDay.map((day) => {
    const arrayLichChieuSukienFilterByDay = arrayAllLichChieuSukien.filter(
      (item) => {
        if (item.ngayChieuGioChieu.slice(0, 10) === day) {
          return true;
        }
        return false;
      }
    );
    const arrayCumRapChieuRemoveDup = arrayLichChieuSukienFilterByDay?.filter(
      (itemIncrease, indexIncrease, arr) => {
        const indexFirstFounded = arr.findIndex(
          (t) => t.tenCumRap === itemIncrease.tenCumRap
        );
        return indexIncrease === indexFirstFounded;
      }
    );
    const arrayCumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
      const tenCumRap = cumRapChieu.tenCumRap;
      const maLichChieu = cumRapChieu.maLichChieu;
      const lichChieuSukien = arrayLichChieuSukienFilterByDay.filter(
        (lichChieuSukien) => lichChieuSukien.tenCumRap === tenCumRap
      );
      return { tenCumRap, maLichChieu, lichChieuSukien };
    });

    return arrayCumRapChieu;
  });
  return { arrayDay, allArrayCumRapChieuFilterByDay };
};

const selectCommentByMaSukienAndCommentTest = createSelector(
  (state, maSukien) =>
    state.eventDetailReducer.commentList.filter(
      (item) => item.dataTest || item.maSukien === maSukien
    ), // nếu comment là dataTest hoặc trùng mã sukien thì lấy
  (commentListFiltered) => {
    const commentList = commentListFiltered.sort(
      (a, b) =>
        formatDate(b.createdAt).getTime - formatDate(a.createdAt).getTime
    );
    return { commentList };
  }
);

export {
  selectMobileData,
  selectDesktopData,
  selectCommentByMaSukienAndCommentTest,
};
