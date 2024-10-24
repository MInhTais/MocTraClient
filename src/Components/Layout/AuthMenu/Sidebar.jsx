export const SidebarMenu = [
  {
    icon: "",
    title: "Thông tin",
    key:'sub1',
    submenu: [
      {
        title: "Cập nhật thông tin",
        key:1,
        url: "/cap-nhat-ho-so",
        name: "Cập nhật thông tin",
      },
      {
        title: "Đổi mật khẩu",
        key:2,
        url: "/doi-mat-khau",
        name: "Đổi mật khẩu",
      }
    ],
  },
  {
    icon: "",
    title: "Đơn hàng",
    key:'sub2',
    submenu: [
      {
        title: "Đơn hàng đã đặt",
        key:3,
        url: "/lich-su-mua-hang",
        name: "Đơn hàng đã đặt",
      },
      {
        title: "Đơn hàng đang chờ",
        key:4,
        url: "/don-hang-dang-cho",
        name: "Đơn hàng đang chờ",
      },
      {
        title: "Mã giảm giá",
        key:5,
        url: "/ma-giam-gia",
        name: "Mã giảm giá",
      },
      {
        title: "Yêu thích",
        key:6,
        url: "/yeu-thich",
        name: "Yêu thích",
      }
    ],
  }
];
