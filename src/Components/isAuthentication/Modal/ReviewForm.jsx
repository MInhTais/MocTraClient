import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import { ErrorMessage, Formik, Form, Field } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_ACTION, UPDATE_COMMENT_ACTION } from "../../../Common/Action/Review/ReviewAction";
import { TITLE_LOGIN } from "../../../Common/Const/Auth/AuthConst";
import { OPEN_FORM_MODAL } from "../../../Common/Const/Modal/ModalConst";
import { reviewSchema } from "../../../validates/Review";
import LoginForm from "../../Modal/LoginForm";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export default function ReviewForm(props) {
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { product } = props;
  const dispatch = useDispatch();
  const { reviewEdit } = useSelector((state) => state.ReviewReducer);
  const {edit} =useSelector((state)=>state.DrawerModalReducer);

  const handleSubmitReview = (values) => {
    if (credentials) {

      if(edit){
        dispatch({
          type: UPDATE_COMMENT_ACTION,
          review: values,
          masp: values?.spdg?.masp,
        });
      }else{
        if (!reviewEdit.madg) {
          values.spdg = product;
        }
        dispatch({
          type: ADD_COMMENT_ACTION,
          reviews: values,
          masp: product.masp,
        });
      }
    } else {
      dispatch({
        type: OPEN_FORM_MODAL,
        Component: <LoginForm />,
        title: TITLE_LOGIN,
        width: 500,
      });
    }
  };
  const CustomInputComponent = (props) => (
    <textarea rows={5} className="input-responsive" {...props} />
  );
  return (
    <div className="mt-4">
      <h1 className="mt-5 text-xl text-center font-bold text-green-600 hover:text-green-800 cursor-default">
        ĐÁNH GIÁ
      </h1>
      <Formik
        initialValues={{
          madg: reviewEdit?.madg ? reviewEdit?.madg : null,
          tkdg: reviewEdit?.tkdg
            ? reviewEdit?.tkdg
            : {
                tendn: credentials?.tendn,
              },
          noidung: reviewEdit?.noidung ? reviewEdit?.noidung : "",
          danhgia: reviewEdit?.danhgia ? reviewEdit?.danhgia : 4,
          spdg: reviewEdit?.spdg ? reviewEdit?.spdg : product?.masp,
        }}
        validationSchema={reviewSchema}
        onSubmit={handleSubmitReview}
      >
        {(formikProps) => (
          <Form className="w-full">
            <div className="flex flex-col">
              <div className="mb-4 w-full flex flex-row">
                <div className="w-1/12">
                  <Avatar
                    src={
                      credentials?.hinhanh
                        ? "http://localhost:8080/images/user/" +
                          credentials?.hinhanh
                        : "https://joeschmoe.io/api/v1/random"
                    }
                    alt="Mộc Trà"
                  />
                </div>
                <div className="flex flex-col w-11/12">
                  <Field
                    name="noidung"
                    as={CustomInputComponent}
                    placeholder="Sản phẩm tuyệt vời"
                    onChange={formikProps.handleChange}
                  />
                  <ErrorMessage name="noidung">
                    {(msg) => <div className="text-error">{msg}</div>}
                  </ErrorMessage>
                  <Rate
                    name="danhgia"
                    value={formikProps?.values?.danhgia}
                    character={({ index }) => customIcons[index + 1]}
                    onChange={(e) => {
                      formikProps.setFieldValue("danhgia", e);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <button
                  type="submit"
                  className=" w-1/4 button-3d-green mb-5 rounded-md"
                >
                  Đánh giá
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
