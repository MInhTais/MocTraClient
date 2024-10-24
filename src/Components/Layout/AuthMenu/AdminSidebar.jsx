import {
  AppleOutlined,
  PieChartOutlined,
  SafetyOutlined,
  TagsOutlined,
  TeamOutlined,
  StarOutlined,
  BgColorsOutlined,
  BookOutlined ,
  HomeOutlined,
  GiftOutlined,
} from "@ant-design/icons";

export const AdminSidebar = [
  {
    icon: <TeamOutlined style={{ fontSize: 15 }} />,
    title: "Nhà cung cấp",
    subkey: "sub1",
    submenu: [
      {
        key: 1,
        title: "Nhà cung cấp",
        url: "/nha-cung-cap",
        name: "Nhà cung cấp",
      },
      {
        key: 2,
        title: "Đối tác",
        url: "/doi-tac",
        name: "Đối tác",
      },
      {
        key: 3,
        title: "Đơn vị tính",
        url: "/don-vi-tinh",
        name: "Đơn vị tính",
      },
    ],
  },
  {
    icon: <StarOutlined style={{ fontSize: 15 }} />,
    title: "Loại & Thương hiệu",
    subkey: "sub2",
    submenu: [
      { key: 4, title: "Nhóm loại", url: "/nhom-loai", name: "Nhóm loại" },
      {
        key: 5,
        title: "Loại sản phẩm",
        url: "/loai-san-pham",
        name: "Loại sản phẩm",
      },
      {
        key: 6,
        title: "Thương hiệu",
        url: "/thuong-hieu",
        name: "Thương hiệu",
      },
    ],
  },
  {
    icon: <AppleOutlined style={{ fontSize: 15 }} />,
    title: "Sản phẩm",
    subkey: "sub3",
    submenu: [
      { key: 7, title: "Sản phẩm", url: "/san-pham", name: "Sản phẩm" },
    ],
  },
  {
    icon: <TagsOutlined style={{ fontSize: 15 }} />,
    title: "Đơn hàng",
    subkey: "sub4",
    submenu: [
      { key: 8, title: "Đơn hàng", url: "/duyet-don-hang", name: "Đơn hàng" },
    ],
  },
  {
    icon: <SafetyOutlined style={{ fontSize: 15 }} />,
    title: "Tài khoản",
    subkey: "sub5",
    submenu: [
      { key: 9, title: "Tài khoản", url: "/tai-khoan", name: "Tài khoản" },
    ],
  },
  {
    icon: <PieChartOutlined style={{ fontSize: 15 }} />,
    title: "Thống kê",
    subkey: "sub6",
    submenu: [
      {
        key: 10,
        title: "Doanh thu",
        url: "/thong-ke-doanh-thu",
        name: "Doanh thu",
      },
      {
        key: 11,
        title: "Thống kê sản phẩm",
        url: "/thong-ke-san-pham",
        name: "Thống kê sản phẩm",
      },
    ],
  },
  {
    icon: <BgColorsOutlined style={{ fontSize: 15 }} />,
    title: "Carousel",
    subkey: "sub7",
    submenu: [
      { key: 12, title: "Carousel", url: "/carousel", name: "Carousel" },
    ],
  },
  {
    icon: <GiftOutlined style={{ fontSize: 15 }} />,
    title: "Sự kiện",
    subkey: "sub8",
    submenu: [
      { key: 13, title: "Sự kiện", url: "/quan-ly-su-kien", name: "Sự kiện" },
    ],
  },
  {
    icon: <BookOutlined style={{ fontSize: 15 }} />,
    title: "Mã giảm giá",
    subkey: "sub9",
    submenu: [
      { key: 14, title: "Mã giảm giá", url: "/quan-ly-ma-giam-gia", name: "Mã giảm giá" },
    ],
  },
  {
    icon: <HomeOutlined className="text-sm" />,
    title: 'Trang chủ',
    subkey: "sub10",
    submenu:[
      {
        key:15,
        title:'Trang chủ',
        url:'/trang-chu',
        name:'Trang chủ'
      }
    ]
  }
];
