-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: nodejsapi
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `datve`
--

DROP TABLE IF EXISTS `datve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datve` (
  `maGhe` int NOT NULL AUTO_INCREMENT,
  `tenGhe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loaiGhe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `giaVe` double NOT NULL,
  `taiKhoanNguoiDat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maLichChieu` int NOT NULL,
  `tenDayDu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isConfirm` bit(1) NOT NULL,
  `diaChiNguoiNhan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`maGhe`),
  KEY `mlc` (`maLichChieu`),
  CONSTRAINT `mlc` FOREIGN KEY (`maLichChieu`) REFERENCES `lichchieuinsert` (`maLichChieu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=278 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datve`
--

LOCK TABLES `datve` WRITE;
/*!40000 ALTER TABLE `datve` DISABLE KEYS */;
INSERT INTO `datve` VALUES (181,'104','Thuong',75000,'namnghiem',16555,'G09',_binary '',NULL),(182,'105','Thuong',75000,'namnghiem',16555,'G10',_binary '',NULL),(183,'117','Thuong',75000,'namnghiem',16549,'H06',_binary '',NULL),(184,'118','Thuong',75000,'namnghiem',16549,'H07',_binary '',NULL),(185,'151','Thuong',75000,'namnghiem',16549,'J08',_binary '',NULL),(186,'152','Thuong',75000,'namnghiem',16549,'J09',_binary '',NULL),(209,'137','Thuong',75000,'admin',16549,'I10',_binary '\0',NULL),(210,'138','Thuong',75000,'admin',16549,'I11',_binary '\0',NULL),(222,'106','Thuong',75000,'namnghiem',16555,'G11',_binary '',NULL),(223,'107','Thuong',75000,'namnghiem',16555,'G12',_binary '',NULL),(236,'121','Thuong',50000,'gasky2k1',16549,'H10',_binary '',NULL),(237,'122','Thuong',50000,'gasky2k1',16549,'H11',_binary '',NULL),(238,'88','Thuong',65000,'user',16549,'F09',_binary '\0',NULL),(239,'89','Thuong',65000,'user',16549,'F10',_binary '\0',NULL),(240,'90','Thuong',50000,'user',16549,'F11',_binary '\0',NULL),(244,'73','Thuong',65000,'user',16549,'E10',_binary '\0',NULL),(245,'74','Thuong',65000,'user',16549,'E11',_binary '\0',NULL),(246,'88','Vip',90000,'user',16554,'F09',_binary '\0',NULL),(247,'89','Vip',90000,'user',16554,'F10',_binary '\0',NULL),(248,'91','Thuong',50000,'user',16549,'F12',_binary '\0',NULL),(249,'92','Thuong',50000,'user',16549,'F13',_binary '\0',NULL),(250,'107','Thuong',50000,'user',16549,'G12',_binary '\0',NULL),(251,'108','Thuong',50000,'user',16549,'G13',_binary '\0',NULL),(252,'100','Thuong',50000,'user',16549,'G05',_binary '\0',NULL),(253,'101','Thuong',50000,'user',16549,'G06',_binary '\0',NULL),(254,'102','Thuong',50000,'user',16549,'G07',_binary '\0',NULL),(255,'103','Thuong',50000,'user',16549,'G08',_binary '\0',NULL),(256,'90','Vip',75000,'user',16552,'F11',_binary '\0','Hoa Sơn'),(257,'91','Vip',75000,'user',16552,'F12',_binary '\0','Hoa Sơn'),(258,'86','Vip',90000,'user',16552,'F07',_binary '\0',NULL),(259,'87','Vip',90000,'user',16552,'F08',_binary '\0',NULL),(260,'88','Vip',90000,'user',16552,'F09',_binary '\0',NULL),(261,'102','Vip',75000,'user',16552,'G07',_binary '\0',NULL),(262,'103','Vip',75000,'user',16552,'G08',_binary '\0',NULL),(263,'104','Vip',75000,'user',16552,'G09',_binary '\0',NULL),(264,'85','Thuong',65000,'giangtrungquan',16549,'F06',_binary '\0','hmonh'),(265,'86','Thuong',65000,'giangtrungquan',16549,'F07',_binary '\0','hmonh'),(266,'83','Thuong',65000,'giangtrungquan',16549,'F04',_binary '',NULL),(267,'99','Thuong',50000,'giangtrungquan',16549,'G04',_binary '',NULL),(268,'83','Thuong',65000,'giangtrungquan',16549,'F04',_binary '',NULL),(269,'99','Thuong',50000,'giangtrungquan',16549,'G04',_binary '',NULL),(270,'83','Thuong',65000,'giangtrungquan',16549,'F04',_binary '',NULL),(271,'99','Thuong',50000,'giangtrungquan',16549,'G04',_binary '',NULL),(272,'84','Vip',90000,'giangtrungquan',16552,'F05',_binary '',NULL),(273,'85','Vip',90000,'giangtrungquan',16552,'F06',_binary '',NULL),(274,'158','Vip',75000,'giangtrungquan',16555,'J15',_binary '',NULL),(275,'159','Vip',75000,'giangtrungquan',16555,'J16',_binary '',NULL),(276,'139','Thuong',50000,'giangtrungquan',16549,'I12',_binary '\0','Hoàng Mai'),(277,'140','Thuong',50000,'giangtrungquan',16549,'I13',_binary '\0','Hoàng Mai');
/*!40000 ALTER TABLE `datve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laythongtincanhanvm`
--

DROP TABLE IF EXISTS `laythongtincanhanvm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laythongtincanhanvm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taiKhoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laythongtincanhanvm`
--

LOCK TABLES `laythongtincanhanvm` WRITE;
/*!40000 ALTER TABLE `laythongtincanhanvm` DISABLE KEYS */;
/*!40000 ALTER TABLE `laythongtincanhanvm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichchieuinsert`
--

DROP TABLE IF EXISTS `lichchieuinsert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichchieuinsert` (
  `maLichChieu` int NOT NULL AUTO_INCREMENT,
  `ngayChieuGioChieu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `giaVe` double NOT NULL,
  `thoiLuong` int NOT NULL,
  `maSukien` int DEFAULT NULL,
  PRIMARY KEY (`maLichChieu`),
  KEY `fk_maSukien` (`maSukien`),
  CONSTRAINT `fk_maSukien` FOREIGN KEY (`maSukien`) REFERENCES `sukieninsert` (`maSukien`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16557 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichchieuinsert`
--

LOCK TABLES `lichchieuinsert` WRITE;
/*!40000 ALTER TABLE `lichchieuinsert` DISABLE KEYS */;
INSERT INTO `lichchieuinsert` VALUES (16549,'2023-10-19T02:59',50000,120,1282),(16552,'2023-10-26T02:59',75000,120,1322),(16553,'2023-10-13T03:06',75000,120,1345),(16554,'29/09/2023 22:02:00',75000,120,1346),(16555,'29/09/2023 22:15:00',75000,120,1347);
/*!40000 ALTER TABLE `lichchieuinsert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidungvm`
--

DROP TABLE IF EXISTS `nguoidungvm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidungvm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taiKhoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `matKhau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `soDt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maLoaiNguoiDung` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hoTen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidungvm`
--

LOCK TABLES `nguoidungvm` WRITE;
/*!40000 ALTER TABLE `nguoidungvm` DISABLE KEYS */;
INSERT INTO `nguoidungvm` VALUES (7,'plzz','c4ca4238a0b923820dcc509a6f75849b','plzz@gmail.com','0654232388','KhachHang','plzz'),(8,'jkg','c4ca4238a0b923820dcc509a6f75849b','jkg@gmail.com','0658987544','KhachHang','jkg'),(9,'jkgl','c4ca4238a0b923820dcc509a6f75849b','jkgl@gmail.com','0258987544','KhachHang','jkgl'),(10,'jkgl','c4ca4238a0b923820dcc509a6f75849b','jkgl@gmail.com','0258987544','KhachHang','jkgl'),(11,'jkg2l','c4ca4238a0b923820dcc509a6f75849b','jkgl@gmail.com','0258987544','KhachHang','jkgl'),(12,'jkg2l','c4ca4238a0b923820dcc509a6f75849b','jkgl@gmail.com','0258987544','KhachHang','jkgl'),(15,'j23ls','c4ca4238a0b923820dcc509a6f75849b','jkg3ls@gmail.com','0338987544','KhachHang','j23ls'),(16,'final','c4ca4238a0b923820dcc509a6f75849b','final@gmail.com','0654748511','KhachHang','final'),(18,'done','c4ca4238a0b923820dcc509a6f75849b','done@gmail.com','0865474855','KhachHang','done'),(22,'duong','c4ca4238a0b923820dcc509a6f75849b','duongtq6797@gmail.com','0983279347','KhachHang','Dương'),(23,'admin','c4ca4238a0b923820dcc509a6f75849b','duongtq6797@gmail.com','0983279347','QuanTri','admin'),(27,'namnghiem','25d55ad283aa400af464c76d713c07ad','dinhnamsaker@gmail.com','0987654321','KhachHang','Nghiêm Đình Nam'),(28,'kien2k','25d55ad283aa400af464c76d713c07ad','kien@gmail.com','0987654321','KhachHang','Lê Văn Kiên'),(29,'giangtrungquan','e10adc3949ba59abbe56e057f20f883e','giangtrungquan01@gmail.com','0397259946','KhachHang','Quân');
/*!40000 ALTER TABLE `nguoidungvm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sukieninsert`
--

DROP TABLE IF EXISTS `sukieninsert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sukieninsert` (
  `maSukien` int NOT NULL AUTO_INCREMENT,
  `tenSukien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `trailer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `moTa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ngayBieuDien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nhaSanXuat` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `daoDien` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ngoiSao` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hinhAnh` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`maSukien`)
) ENGINE=InnoDB AUTO_INCREMENT=1348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sukieninsert`
--

LOCK TABLES `sukieninsert` WRITE;
/*!40000 ALTER TABLE `sukieninsert` DISABLE KEYS */;
INSERT INTO `sukieninsert` VALUES (1282,'Sketch A Rose','https://www.youtube.com/embed/uqJ9u7GSaYM','Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he\'s a person in a court of law. 1','2025-07-03T06:03:00.000Z','Việt Nam','Hà Châu','Châu Hà','https://salt.tkbcdn.com/ts/ds/25/e6/b4/d79786df1e38c39beabe33c462cc381e.jpg'),(1322,'ATVNCG Concert Tháng 3','https://www.youtube.com/embed/XGk2EfbD_Ps','Mạng đổi mạng là một bộ sukien hành động Mỹ sản xuất năm 2014, được đạo diễn bởi Chad Stahelski. Sukien có sự tham gia của các diễn viên Keanu Reeves, Michael Nyqvist, Alfie Allen, Adrianne Palicki, Bridget Moynahan, Ian McShane, Willem Dafoe, John Leguizamo ','2025-01-24T21:00:00.000Z','Việt Nam','Hà Châu','Châu Hà','https://salt.tkbcdn.com/ts/ds/df/3e/a2/8e564c468a13ee9c49ab0a1b1c730c0b.png'),(1345,'Anh Trai Say Hi Concert','https://www.youtube.com/watch?v=bbh51DCUKYY','Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he\'s a person in a court of law. 1','2025-06-29T22:22:59.112Z','Việt Nam','Hà Châu','Châu Hà','https://salt.tkbcdn.com/ts/ds/df/3e/a2/8e564c468a13ee9c49ab0a1b1c730c0b.png'),(1346,'Gấu Concert','https://www.youtube.com/embed/TxTiuStmdlU?si=o0nLBMmRtOvVnZbL','The whole experience was filled with laughter, bonding, and adventure. We shared stories around the campfire, played card games, and stargazed at night. I remember feeling a deep sense of joy and contentment being surrounded by my loved ones and being in such a beautiful natural setting.\n\nWhat made this experience even more special was the absence of technology. We disconnected from our phones and gadgets, allowing us to fully appreciate the simplicity and tranquility of the outdoors. It was a time of genuine connection, where we laughed, explored, and created lasting memories together.','2025-10-23T05:14:00.000Z','Việt Nam','Hà Châu','Châu Hà','https://salt.tkbcdn.com/ts/ds/25/e6/b4/d79786df1e38c39beabe33c462cc381e.jpg'),(1347,'The Veston Concert','https://www.youtube.com/embed/uqJ9u7GSaYM','In our busy lives, it\'s crucial to remember to treat others with compassion and understanding. Small acts of kindness can make a big difference','2025-10-31T23:33:12.417Z','Việt Nam','Hà Châu','Châu Hà','https://salt.tkbcdn.com/ts/ds/25/e6/b4/d79786df1e38c39beabe33c462cc381e.jpg');
/*!40000 ALTER TABLE `sukieninsert` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15 11:50:40
