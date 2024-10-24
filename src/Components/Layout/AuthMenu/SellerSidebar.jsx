import {
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  StarOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const SellerSidebar = [
  {
    icon: <ShopOutlined style={{ fontSize: 15 }} />,
    title: "CỬA HÀNG",
    subkey: "sub1",
    submenu: [
      {
        key: 1,
        title: "Cửa hàng",
        url: "/cua-hang",
        name: "Cửa hàng",
      },
    ],
  },
  {
    icon: <TeamOutlined style={{ fontSize: 15 }} />,
    title: "ĐƠN HÀNG",
    subkey: "sub2",
    submenu: [
      {
        key: 2,
        title: "Xử lý đơn hàng",
        url: "/quan-ly-don-hang",
        name: "Xử lý đơn hàng",
      },
    ],
  },
  {
    icon: <StarOutlined style={{ fontSize: 15 }} />,
    title: "SẢN PHẨM",
    subkey: "sub3",
    submenu: [
      { key: 3, title: "Sản phẩm", url: "/quan-ly-san-pham", name: "Sản phẩm" },
      {
        key: 4,
        title: "Thương hiệu",
        url: "/quan-ly-thuong-hieu",
        name: "Thương hiệu",
      },
    ],
  },
  {
    icon: <PieChartOutlined style={{ fontSize: 15 }} />,
    title: "TÀI CHÍNH",
    subkey: "sub4",
    submenu: [
      {
        key: 5,
        title: "Doanh thu",
        url: "/quan-ly-doanh-thu",
        name: "Doanh thu",
      },
      {
        key: 6,
        title: "Sản phẩm",
        url: "/doanh-thu-san-pham",
        name: "Sản phẩm",
      },
    ],
  },
  {
    icon: <HomeOutlined style={{ fontSize: 15 }} />,
    title: "TRANG CHỦ",
    subkey: "sub5",
    submenu: [
      {
        key: 7,
        title: "Trang chủ",
        url: "/trang-chu",
        name: "Trang chủ",
      },
    ],
  },
];
