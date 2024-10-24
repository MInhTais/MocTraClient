import { Tag } from "antd";
import React from "react";

export default function FastViewProduct({ctdh}) {
  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <div className="mx-auto">
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img
                  src={
                    "http://localhost:8080/images/product/" +
                    ctdh?.hdspct?.hinhanh
                  }
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  {ctdh?.hdspct?.tensp}
                </h2>
                <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4" />
                <p className="text-base">{ctdh?.hdspct?.mota}</p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4 flex flex-col">
                <p>
                  Loại: <Tag color="green">{ctdh?.hdspct?.masp}</Tag>
                </p>
                <p>Thương hiệu: {ctdh?.hdspct?.thuonghieu?.tenth}</p>
                <p>Nhà cung cấp: {ctdh?.hdspct?.nhacungcap?.tenncc}</p>
                <p>Hiện còn: {ctdh?.hdspct?.conlai}</p>
                <p>
                  Trạng thái:{" "}
                  <Tag
                    color={
                      ctdh?.hdspct?.conlai - ctdh?.sl > 0
                        ? "green"
                        : "red"
                    }
                  >
                    {ctdh?.hdspct?.conlai - ctdh?.sl > 0
                      ? "Còn hàng"
                      : "Hết hàng"}
                  </Tag>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
