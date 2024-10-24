import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { ADD_REPLY_ACTION } from "../../Common/Action/Review/ReviewAction";
import { replySchema } from "../../validates/Review";
import moment from 'moment';
function ReplyComponent(props) {
  const { review } = props;
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  return (
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-gray-50 text-gray-800">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center">{review?.hoten}</h2>
        <span className="text-center text-base text-gray-400">
          {moment(review?.ngaygui).format('DD/MM/YYYY HH:ss:mm')}
        </span>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">
            {review?.noidung?.length > 20
              ? review?.noidung.slice(0, 20)
              : review?.noidung}
          </span>
          <div className="flex space-x-3">
            <Rate
              disabled
              value={review?.danhgia}
              character={<HeartOutlined />}
              allowHalf
            />
          </div>
        </div>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <textarea
            rows={3}
            placeholder="Message..."
            className="p-4 rounded-md resize-none input-responsive"
            name="noidung"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-green-600 hover:bg-green-900"
          >
            PHẢN HỒI
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <a href="#" className="text-sm text-gray-600">
          Maybe later
        </a>
      </div>
    </div>
  );
}

const replyForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      noidung: "",
    };
  },
  validationSchema: replySchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const {review, dispatch} = props;
    values.dg = review;
    dispatch({
      type: ADD_REPLY_ACTION,
      reply: values,
      masp: values?.dg?.spdg?.masp
    });
  },
  displayName: "ReplyForm",
})(ReplyComponent);

export default connect(null)(replyForm);
