import React, { useState } from "react";
import {
  responsiveReview,
} from "../Home/ResponsiveCarousel";
import _ from "lodash";
import { useDispatch} from "react-redux";
import { Popover, Rate } from "antd";
import ViewReplyComponent from "./ViewReplyComponent";
import Carousel from "react-multi-carousel";
import { ErrorMessage, Form, Formik } from "formik";
import { reviewSchema } from "../../validates/Review";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import {
  UPDATE_COMMENT_ACTION,
} from "../../Common/Action/Review/ReviewAction";
import moment from 'moment';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
export default function ReviewComponent(props) {
  const dispatch = useDispatch();
  const { reviews, detail } = props;
  const [state, setState] = useState(false);
  const [reviewID, setReviewID] = useState(null);

  const handleSubmit = (values) => {
    dispatch({
      type: UPDATE_COMMENT_ACTION,
      review: values,
      masp: values?.spdg?.masp,
    });
    setState(false);
    setReviewID(null);
  };

  const visibleEdit = (review, visible) => {
    setState(visible);
    setReviewID(review?.madg);
  };
  return (
    <Carousel
      responsive={responsiveReview}
      className="m-3"
    >
      {_?.map(reviews, (review, i) => {
        return (
          <div
            key={i}
            className="md:container h-80 flex flex-col w-full max-w-lg p-2 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-lg"
          >
            <div className="flex flex-row justify-between p-4">
              <div className="flex flex-row w-full gap-2">
                <div>
                  <img
                    src={
                      review?.tkdg?.hinhanh
                        ? "http://localhost:8080/images/user/" +
                          review?.tkdg?.hinhanh
                        : "https://source.unsplash.com/100x100/?portrait"
                    }
                    alt="Bách Mộc"
                    className={
                      detail
                        ? "object-cover w-8 h-8 rounded-full"
                        : "object-cover w-8 h-8 rounded-full"
                    }
                  />
                </div>
                <div className="w-full flex flex-col">
                  <h4 className="font-bold text-xs">{review?.tkdg?.hoten}</h4>
                  <small className="text-xs dark:text-gray-400">
                    {moment(review.ngaygui).format('DD/MM/YYYY HH:ss:mm')}
                  </small>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-500">
                {review.danhgia <3 ? <FrownOutlined className=" text-gray-500 text-lg" /> : review.danhgia === 3 ? <MehOutlined className=" text-yellow-300 text-lg" />
                : <SmileOutlined className=" text-yellow-500 text-lg" />}
                <span className="text-xl font-bold">{review.danhgia}</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-lg dark:text-gray-400 text-left">
              {state && review?.madg === reviewID ? (
                <Formik
                  initialValues={{
                    madg: review?.madg,
                    tkdg: review?.tkdg,
                    noidung: review?.noidung,
                    danhgia: review?.danhgia,
                    spdg: review?.spdg,
                  }}
                  validationSchema={reviewSchema}
                  onSubmit={handleSubmit}
                >
                  {(formikProps) => (
                    <Form className="w-full">
                      <div className="flex flex-col">
                        <div className="mb-4 w-full flex flex-col">
                          <textarea
                            type="text"
                            name="noidung"
                            value={formikProps.values?.noidung}
                            className="input-responsive"
                            placeholder="Sản phẩm tuyệt vời"
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="noidung">
                            {(msg) => <div className="text-error">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="mb-4 w-full">
                          <Rate
                            name="danhgia"
                            value={review.danhgia}
                            character={({ index }) => customIcons[index + 1]}
                            onChange={(e) => {
                              review.danhgia = e;
                              formikProps.setFieldValue("danhgia", e);
                            }}
                          />
                        </div>
                        <div className="flex flex-row justify-center gap-2">
                          <div>
                            <button
                              className="w-full p-2 text-white text-xs bg-green-500 mb-5 rounded-sm"
                              type="submit"
                            >
                              Chỉnh sửa
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => visibleEdit(review, false)}
                              className=" w-full p-2 text-white text-xs bg-green-500 mb-5 rounded-sm"
                            >
                              Hủy bỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <p className="h-20">{review.noidung}</p>
              )}
            </div>
            <Popover
              key={i}
              placement="top"
              content={() => {
                return <ViewReplyComponent review={review} />;
              }}
            >
              <button className="bg-gradient-to-r from-green-300 to-green-500 rounded-sm p-2 uppercase hover:bg-green-400">
                Xem phản hồi
              </button>
            </Popover>
          </div>
        );
      })}
    </Carousel>
  );
}
