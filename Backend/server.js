var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var md5 = require("md5");
var mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { application } = require("express");
var nodemailer = require("nodemailer");

let $ = require("jquery");
const request = require("request");
const moment = require("moment");

app.use(cors());
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ limit: "5000mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.options("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

// Set up Global configuration access
dotenv.config();

// route mặc định

// chỉnh port
app.listen(process.env.PORT || 4000, function () {
  console.log("Node app is running on port 4000");
});
module.exports = app;
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "nodeJsApi",
});
dbConn.connect();

const validateToken = (req, res) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, jwtSecretKey);
    if (!verified) return res.status(401).send(error);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
};
// VNPay
app.get("/api/create_payment_url", function (req, res, next) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let config = require("config");
  console.log("DATA CREATE URL: ", req.query);

  const { amount, maLichChieu, taiKhoanNguoiDung, danhSachVe } = req.query;
  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");
  let vnpUrl = config.get("vnp_Url");
  let returnUrl = config.get("vnp_ReturnUrl");
  let orderId = moment(date).format("DDHHmmss");

  let querystring = require("qs");
  let returnUrlParams = querystring.stringify(
    {
      danhSachVe,
      taiKhoanNguoiDung,
      maLichChieu,
    },
    { encode: false }
  );

  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl + maLichChieu + "?" + returnUrlParams;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  console.log("Amount:", amount);
  console.log("Ma Lich Chieu:", maLichChieu);
  console.log("Tai Khoan: ", taiKhoanNguoiDung);
  console.log("Danh sach ve: ", danhSachVe);

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  console.log(vnpUrl);
  res.send(vnpUrl);
});

// QuanLyNguoiDung

app.post("/api/QuanLyNguoiDung/DangKy", async (req, res) => {
  const final = await new Promise((resolve, reject) => {
    dbConn.query(
      "INSERT INTO nguoidungvm SET ? ",
      {
        taiKhoan: req.body.taiKhoan,
        matKhau: md5(req.body.matKhau),
        email: req.body.email,
        soDt: req.body.soDt,
        maLoaiNguoiDung: req.body.maLoaiNguoiDung,
        hoTen: req.body.hoTen,
      },
      function (error, results, fields) {
        if (error) throw error;
        resolve(res.send("Success"));
      }
    );
  });
  return final;
});

app.post("/api/QuanLyNguoiDung/DangNhap", function (req, res) {
  dbConn.query(
    "SELECT * FROM nguoidungvm WHERE taiKhoan=? AND matKhau=?",
    [req.body.taiKhoan, md5(req.body.matKhau)],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        info = JSON.parse(JSON.stringify(results[0]));
        info["accessToken"] = jwt.sign(info, process.env.JWT_SECRET_KEY);
        return res.send(info);
      }
      return res.status(401).send({ error: true });
    }
  );
});

app.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", function (req, res) {
  validateToken(req, res);
  dbConn.query(
    "SELECT * FROM nguoidungvm WHERE taiKhoan = ?",
    [req.body.taiKhoan],
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results[0]);
    }
  );
});

// QuanLyNhaHat

//OK
app.get("/api/QuanLyNhaHat/LayThongTinLichChieuSukien", function (req, res) {
  const maSukien = req.query.MaSukien;

  if (!maSukien) {
    return res.status(400).send({ message: "MaSukien is required" });
  }

  dbConn.query(
    "SELECT * FROM sukieninsert WHERE maSukien = ?",
    [maSukien],
    (error, sukienResults) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      if (sukienResults.length === 0) {
        return res.status(404).send({ message: "Event not found" });
      }

      const sukien = sukienResults[0];

      dbConn.query(
        "SELECT * FROM lichchieuinsert WHERE maSukien = ?",
        [maSukien],
        (error, lichChieuResults) => {
          if (error) {
            console.error(error);
            return res.status(500).send({ message: "Internal Server Error" });
          }

          const lichChieuData = lichChieuResults.map((lichChieu) => ({
            maLichChieu: lichChieu.maLichChieu,
            ngayChieuGioChieu: lichChieu.ngayChieuGioChieu,
            giaVe: lichChieu.giaVe,
            thoiLuong: lichChieu.thoiLuong,
          }));

          const final = {
            maLichChieu: lichChieuData[0].maLichChieu,
            maSukien: sukien.maSukien,
            tenSukien: sukien.tenSukien,
            trailer: sukien.trailer,
            hinhAnh: sukien.hinhAnh.toString(),
            moTa: sukien.moTa,
            ngayBieuDien: sukien.ngayBieuDien,
            nhaSanXuat: sukien.nhaSanXuat,
            daoDien: sukien.daoDien,
            ngoiSao: sukien.ngoiSao,
            maTheLoaiSukien: sukien.maTheLoaiSukien,
          };

          return res.send(final);
        }
      );
    }
  );
});
//OK
app.get("/api/QuanLySukien/LayDanhSachSukien", function (req, res) {
  dbConn.query(
    "SELECT * FROM sukieninsert",
    [],
    function (error, results, fields) {
      if (error) throw error;

      for (var i = 0; i < results.length; i++) {
        results[i].hinhAnh = Buffer.from(results[i].hinhAnh).toString();
      }
      return res.send(results);
    }
  );
});
//OK
app.get("/api/QuanLyDatVe/LayDanhSachPhongVe", function (req, res) {
  // Query thông tin lịch chiếu và sự kiện
  dbConn.query(
    `SELECT lichchieuinsert.*, sukieninsert.tenSukien, sukieninsert.hinhAnh 
     FROM lichchieuinsert 
     JOIN sukieninsert ON lichchieuinsert.maSukien = sukieninsert.maSukien 
     WHERE lichchieuinsert.maLichChieu = ?`,
    [req.query.MaLichChieu],
    async (error, results, fields) => {
      if (error) throw error;

      if (results.length === 0) {
        return res.status(404).send({ message: "Không tìm thấy lịch chiếu." });
      }

      let danhSachGhe = Array.apply(null, Array(160)).map(() => null);

      // Query danh sách ghế đã được đặt
      danhSachGhe = await new Promise((resolve, reject) => {
        dbConn.query(
          "SELECT * FROM datve WHERE maLichChieu = ?",
          [req.query.MaLichChieu],
          (error, results1, fields) => {
            if (error) reject(error);
            for (const result1 of results1) {
              danhSachGhe[result1.tenGhe] = {
                maGhe: result1.maGhe,
                tenGhe: result1.tenGhe,
                loaiGhe: result1.loaiGhe,
                stt: result1.tenGhe,
                giaVe: result1.giaVe,
                daDat: true,
                taiKhoanNguoiDat: result1.taiKhoanNguoiDat,
              };
            }
            resolve(danhSachGhe);
          }
        );
      });

      // Tạo danh sách ghế hoàn chỉnh (160 ghế)
      for (let i = 0; i < 160; i++) {
        if (danhSachGhe[i] === null) {
          danhSachGhe[i] = {
            maGhe: i,
            tenGhe: i > 9 ? String(i) : "0" + String(i),
            loaiGhe: i > 44 && i < 90 ? "Vip" : "Thuong",
            stt: i > 9 ? String(i) : "0" + String(i),
            giaVe:
              i > 44 && i < 90 ? results[0].giaVe + 15000 : results[0].giaVe,
            daDat: false,
            taiKhoanNguoiDat: null,
          };
        }
      }

      // Trả kết quả
      return res.send({
        thongTinSukien: {
          maLichChieu: results[0].maLichChieu,
          tenSukien: results[0].tenSukien,
          hinhAnh: results[0].hinhAnh,
          ngayChieu: results[0].ngayChieuGioChieu,
          gioChieu: results[0].ngayChieuGioChieu,
        },
        danhSachGhe: danhSachGhe,
      });
    }
  );
});
//OK
app.get("/api/QuanLyDatVe/LayDanhSachVeDaMua", function (req, res) {
  // Truy vấn thông tin lịch chiếu, sự kiện, và vé dựa trên tài khoản người đặt
  dbConn.query(
    `SELECT 
        datve.maGhe, 
        datve.maLichChieu, 
        datve.tenGhe, 
        datve.tenDayDu, 
        datve.loaiGhe, 
        datve.giaVe, 
        datve.isConfirm, 
        datve.taiKhoanNguoiDat, 
        lichchieuinsert.ngayChieuGioChieu, 
        lichchieuinsert.giaVe AS giaVeGoc, 
        sukieninsert.tenSukien, 
        sukieninsert.hinhAnh 
     FROM datve
     JOIN lichchieuinsert ON datve.maLichChieu = lichchieuinsert.maLichChieu
     JOIN sukieninsert ON lichchieuinsert.maSukien = sukieninsert.maSukien
     WHERE datve.taiKhoanNguoiDat = ?
     ORDER BY lichchieuinsert.ngayChieuGioChieu DESC`,
    [req.query.taiKhoanNguoiDat],
    (error, results, fields) => {
      if (error) throw error;

      // Xử lý danh sách vé
      console.log("Results get vé", results);

      const danhSachVe = results.map((result) => ({
        maGhe: result.maGhe,
        maLichChieu: result.maLichChieu,
        tenSukien: result.tenSukien,
        hinhAnh: result.hinhAnh,
        ngayChieu: result.ngayChieuGioChieu,
        gioChieu: result.ngayChieuGioChieu,
        tenGhe: result.tenGhe,
        tenDayDu: result.tenDayDu,
        loaiGhe: result.loaiGhe,
        giaVe: result.giaVe,
        status: result.isConfirm && result.isConfirm[0] === 1, // Kiểm tra giá trị buffer
        taiKhoanNguoiDat: result.taiKhoanNguoiDat,
      }));

      return res.send(danhSachVe);
    }
  );
});

app.post("/api/QuanLyDatVe/DatVe", async (req, res) => {
  try {
    const {
      danhSachVe,
      taiKhoanNguoiDung,
      maLichChieu,
      address,
      paymentMethod,
    } = req.body;

    // Tạo danh sách vé từ yêu cầu
    for (const ve of danhSachVe) {
      await new Promise((resolve, reject) => {
        dbConn.query(
          "INSERT INTO datve SET ? ",
          {
            tenGhe: ve.maGhe,
            loaiGhe: ve.giaVe >= 65000 ? "Vip" : "Thuong",
            giaVe: ve.giaVe,
            taiKhoanNguoiDat: taiKhoanNguoiDung,
            maLichChieu: maLichChieu,
            tenDayDu: ve.tenDayDu,
            isConfirm: paymentMethod === "online" ? 1 : 0,
            diaChiNguoiNhan: address,
          },
          function (error, results, fields) {
            if (error) return reject(error);
            resolve();
          }
        );
      });
    }

    return res.send("Success");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Error occurred while booking tickets");
  }
});

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
