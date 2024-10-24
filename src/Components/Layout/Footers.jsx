import { Avatar } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaFacebookF,FaInstagram } from "react-icons/fa";

export default function Footers() {
  const { categories } = useSelector(
    (state) => state.CategoryReducer.categories
  );

  return (
    <>
      <div>
        <footer className="text-gray-600 body-font container">
          <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-b-1 border-gray-200">
            <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 mt-10 md:text-left text-center">
              <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex flex-col">
                <label className=" text-gray-700 text-lg font-bold mb-3">
                  Hỗ trợ khách hàng
                </label>
                <label>Hotline: 0702362681</label>
                <label>Hỗ trợ: hotro@fpt.edu.vn</label>
                <label>Báo lỗi bảo mật: security@fpt.edu.vn</label>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <label className=" text-gray-700 text-lg font-bold mb-3">
                  Phương thức thanh toán
                </label>
                <div className="w-full flex flex-row gap-2">
                  <span className="cursor-pointer">
                    <img src="http://localhost:8080/images/payment/payment-1.png" alt="Mộc Trà" />
                  </span>
                  <span className="cursor-pointer">
                    <img src="http://localhost:8080/images/payment/payment-2.png" alt="Mộc Trà" />
                  </span>
                  <span className="cursor-pointer">
                    <img src="http://localhost:8080/images/payment/payment-3.png" alt="Mộc Trà" />
                  </span>
                  <span className="cursor-pointer">
                    <img src="http://localhost:8080/images/payment/payment-4.png" alt="Mộc Trà" />
                  </span>
                  <span className="cursor-pointer">
                    <img src="http://localhost:8080/images/payment/payment-5.png" alt="Mộc Trà" />
                  </span>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <label className=" text-gray-700 text-lg font-bold mb-3">
                  Kết nối với chúng tôi
                </label>
                <div className="w-full flex flex-row gap-2 fold:justify-center md:justify-start">
                  <a href="https://www.facebook.com/long18799/" className="p-3 bg-gray-200 rounded-full" target={'_blank'}>
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/minhtai.65/" target={'_blank'} className="p-3 bg-gray-200 rounded-full">
                    <FaInstagram />
                  </a>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <label className=" text-gray-700 text-lg font-bold mb-3">
                  Dịch vụ giao hàng
                </label>
                <div className="w-full flex flex-row justify-center gap-4">
                  <Avatar
                    size={40}
                    shape="circle"
                    src="https://api.goship.io/storage/images/carriers/2018_11_19_08_58_42_a44867924ab27607d9a5e12142d7503e.png"
                  />

                  <Avatar
                    size={40}
                    shape="circle"
                    src="https://api.goship.io/storage/images/carriers/vnpost_c.png"
                  />

                  <Avatar
                    size={40}
                    shape="circle"
                    src="https://api.goship.io/storage/images/carriers/vtpost_c.png"
                  />

                  <Avatar
                    size={40}
                    shape="circle"
                    src="https://api.goship.io/storage/images/carriers/2021_12_07_10_36_47_92d84240953b26d3dcf6ed5da91905d5.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container px-5 py-6 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-b-1 border-gray-200">
            <div className="flex-grow flex flex-wrap md:mt-0 mt-10 md:text-left text-center">
              <div className="w-full flex flex-col px-4">
                <label>
                  Địa chỉ văn phòng: 342 Đường B21, KDC 91B, Nguyễn Văn Linh,
                  Quận Ninh Kiều, Thành phố Cần Thơ
                </label>
                <label>
                  Mộc Trà nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ
                  trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử
                  lý đơn hàng
                </label>
                <label>
                  © 2021 - Bản quyền của Công Ty TNHH Mộc Trà - moctra.surge.vn
                </label>
              </div>
            </div>
          </div>

          <div className="container px-5 mx-auto py-6 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-b-1 border-gray-200">
            <div className="w-full flex flex-col ju justify-start gap-y-4 px-4">
              <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <Avatar size={40} src="http://localhost:8080/images/background/logo2.png" shape='circle' />
                  <span className="ml-3 text-xl">MỘC TRÀ</span>
                </a>
              </div>
              <div className="flex-grow flex flex-wrap text-left">
                <div className="w-full flex flex-col justify-start">
                  <div className="w-full flex flex-col justify-start">
                    <label className="text-lg font-bold text-left text-gray-700">
                      Luôn quan tâm đến trải nghiệm của khách hàng
                    </label>
                  </div>
                  <div className="w-full flex flex-col justify-start">
                    <label className="text-left text-gray-700 font-base font-bold">
                      Mộc Trà - Sản phẩm
                    </label>
                    <label className="text-left text-gray-700 font-xs">
                      Với nhiều sản phẩm từ các thương hiệu uy tín từ Rau củ
                      quả, đồ dùng gia đình kèm theo nhiều dịch vụ giao hàng
                      nhanh chóng, mang đến trải nghiệm an toàn khi mua sắm.
                    </label>
                  </div>
                  <div className="w-full flex flex-col justify-start">
                    <label className="text-left text-gray-700 font-base font-bold">
                      Mộc Trà - Ưu đãi
                    </label>
                    <label className="text-left text-gray-700 font-xs">
                      Với nhiều ưu đãi hàng tháng, cùng với việc tích điểm đổi
                      mã giảm giá không giới hạn.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container px-5 mx-auto py-6 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-b-1 border-gray-200">
            <div className="w-full flex flex-col ju justify-start gap-y-4 px-4">
              <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="ml-3 text-xl">DANH MỤC</span>
                </a>
              </div>
              <div className="flex fold:flex-col duo:flex-row duo:flex-wrap text-left">
                {_.map(categories, (category, i) => {
                  return (
                    <div className="fold:w-full duo:w-1/3 px-4" key={i}>
                      <h2 className="title-font text-gray-900 font-bold text-lg">
                        {category?.tennhom}
                      </h2>
                      <nav className="list-none mb-10">
                        {_?.map(category?.loai, (sub, i) => {
                          return (
                            <li key={i}>
                              <NavLink
                                className="text-gray-600 hover:text-gray-800"
                                to={`/search/${sub.tenloai}`}
                              >
                                {sub?.tenloai}
                              </NavLink>
                            </li>
                          );
                        })}
                      </nav>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2021 Lohataquy —
                <a
                  href="https://twitter.com/knyttneve"
                  rel="noopener noreferrer"
                  className="text-gray-600 ml-1"
                  target="_blank"
                >
                  @teamphacach
                </a>
              </p>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a className="text-gray-500" href="https://www.facebook.com/qynngnphg0193" target='_blank'>
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
