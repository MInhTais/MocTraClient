import _ from "lodash";
import React from "react";

export default function ViewReplyComponent({ review }) {

  return (
    <div className="container px-4 py-16 mx-auto space-y-8 fold:w-full md:w-full lg:max-w-3xl xl:w-96 text-left overflow-auto h-96">
      <h2 className="text-2xl font-bold md:text-4xl">PHẢN HỒI</h2>
      <div className="space-y-8">
        {review?.phanhoi && review?.phanhoi?.length > 0
          ? _.map(review?.phanhoi, (item, i) => {
              return (
                <div key={i}>
                  <h3 className="mb-3 text-lg font-bold md:text-xl">
                    {item.ngaytraloi}
                  </h3>
                  <ul className="space-y-4">
                    <li className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-4 h-4 fill-current text-red-600"
                        >
                          <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z" />
                          <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808" />
                        </svg>
                        <h4 className="font-medium">{item?.tendn}</h4>
                      </div>
                      <p className="ml-7 text-gray-600">{item.noidung}</p>
                    </li>
                  </ul>
                </div>
              );
            })
          : "Chưa có phản hồi nào cho đánh giá này"}
      </div>
    </div>
  );
}
