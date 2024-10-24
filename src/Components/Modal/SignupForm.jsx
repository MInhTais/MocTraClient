import React, { useEffect } from "react";

import { ErrorMessage, Field, withFormik } from "formik";
import { signupSchema } from "../../validates/Signup";
import { DatePicker, Radio } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Action from "../../Common/Action/Signup/SignupAction";
import * as Type from '../../Common/Const/Modal/ModalConst';

function SignupForm(props) {
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  useEffect(() => {
    dispatch({
      type: Type.SET_SUBMIT_FORM_MODAL,
      functionSubmit: handleSubmit,
    });
  }, []);

  const disabledDate=(current)=> {
    return current && current.valueOf() >= Date.now();
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="flex fold:flex-col moto:flex-row flex-1 gap-4">
            <div className="flex-1 m-2">
              <span className="float-left">Tên đăng nhập:</span>
              <Field
                type="email"
                className="input-responsive"
                name="tendn"
                placeholder="bachmoc@gmail.com"
                onChange={handleChange}
                autoComplete="off"
              />
              <ErrorMessage name="tendn">
                {(msg)=>{
                  return <p className="text-red-600 text-left text-xs">{msg}</p>
                }}
              </ErrorMessage>
            </div>
            <div className="flex-1 m-2">
              <span className="float-left">Họ tên:</span>
              <Field
                type="text"
                className="input-responsive"
                name="hoten"
                placeholder="Bách Mộc"
                onChange={handleChange}
                autoComplete="off"
              />
              <ErrorMessage name="hoten">
                  {(msg) => {
                    return <p className="text-red-700">{msg}</p>
                  }}
              </ErrorMessage>
            </div>
          </div>
          <div className="flex fold:flex-col moto:flex-row flex-1 gap-4">
            <div className="flex-1 m-2">
              <span className="float-left">Mật khẩu:</span>
              <Field
                type="password"
                className="input-responsive"
                name="matkhau"
                placeholder="*****"
                onChange={handleChange}
              />
              <ErrorMessage name="matkhau">
                  {(msg) => {
                    return <p className="text-red-700">{msg}</p>
                  }}
              </ErrorMessage>
            </div>
            <div className="flex-1 m-2">
              <span className="float-left">Mật khẩu xác nhận:</span>
              <Field
                type="password"
                className="input-responsive"
                name="matkhauxn"
                placeholder="*****"
                onChange={handleChange}
                autoComplete="off"
              />
              <ErrorMessage name="matkhauxn">
                {(msg)=>{
                  return <p className="text-red-600 text-left text-xs">{msg}</p>
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="flex fold:flex-col moto:flex-row flex-1 gap-4">
            <div className=" flex-1 m-2">
              <span className="float-left">Giới tính:</span>
              <br />
              <Radio.Group
                defaultValue="true"
                name="gioitinh"
                className="float-left"
                buttonStyle="solid"
                onChange={handleChange}
                autoComplete="off"
              >
                <Radio.Button value="true">Nam</Radio.Button>
                <Radio.Button value="false">Nữ</Radio.Button>
              </Radio.Group>
            </div>
            <div className="flex-1 m-2">
              <span className="float-left">Ngày sinh:</span>
              <DatePicker
                disabledDate={disabledDate}
                name="ngaysinh"
                className="input-responsive"
                onChange={(date) => setFieldValue("ngaysinh", date)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button type="submit" className="button-3d-green">Đăng Ký</button>
          </div>
        </form>
      </div>
    </>
  );
}

const signUpForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) =>{
    return {
      tendn: '',
      hoten: '',
      matkhau: '',
      ngaysinh: new Date(),
      gioitinh: false
    }; 
  },
  validationSchema: signupSchema,
  handleSubmit: (values, {props, setSubmitting})=>{
    props.dispatch({
      type: Action.SIGN_UP_ACTION,
      signup: values
    })
  },
  displayName:'SignUpForm'
})(SignupForm)

export default connect(null)(signUpForm)