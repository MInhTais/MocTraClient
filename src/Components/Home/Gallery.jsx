import React from "react";

export default function Gallery() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative" style={{backgroundImage:`url('http://localhost:8080/images/gallery/gal-1.jpg')`,backgroundSize:'100%'}}>
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0"
                  src="http://localhost:8080/images/gallery/gal-1.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    SIÊU SALES
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Giảm từ 5-30% khi mua hàng tại Mộc Trà.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative" style={{backgroundImage:`url('http://localhost:8080/images/gallery/gal-2.jpg')`,backgroundSize:'100%'}}>
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center bg-opacity-0"
                  src="http://localhost:8080/images/gallery/gal-2.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    SIÊU SALES
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Tặng voucher 20k khi trở thành thành viên của Mộc Trà.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative" style={{backgroundImage:`url('http://localhost:8080/images/gallery/gal-3.jpg')`,backgroundSize:'100%'}}>
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center bg-opacity-0"
                  src="http://localhost:8080/images/gallery/gal-3.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    MIỄN PHÍ VẬN CHUYỂN
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Miễn phí vận chuyển 20k cho mọi đơn hàng.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative" style={{backgroundImage:`url('http://localhost:8080/images/gallery/gal-4.jpg')`,backgroundSize:'100%'}}>
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center bg-opacity-0"
                  src="http://localhost:8080/images/gallery/gal-4.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    SIÊU SALES
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Mua càng nhiều, khuyến mãi càng nhiều.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative" style={{backgroundImage:`url('http://localhost:8080/images/gallery/gal-5.jpg')`,backgroundSize:'100%'}}>
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center bg-opacity-0"
                  src="http://localhost:8080/images/gallery/gal-5.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    SIÊU SALES
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Hỗ trợ hoàn trả sản phẩm trong vòng 24 giờ từ khi nhận hàng.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src="http://localhost:8080/images/gallery/gal-6.jpg"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-500 mb-1">
                    SIÊU SALES
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Merry Christmas
                  </h1>
                  <p className="leading-relaxed">
                    Sự kiện vòng quay may mắn hỗ trợ nhiều ưu đãi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
