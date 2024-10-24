import { ErrorMessage,  Field,  withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Type from "../../Common/Const/Modal/ModalConst";
import { loginSchema } from "../../validates/Login";
import * as LoginAction from "../../Common/Action/Authentication/AuthAction";
import ForgotForm from "./ForgotForm";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LOGIN_WITH_OAUTH2_ACTION } from "../../Common/Action/Authentication/AuthAction";
import _ from "lodash";
import { APPID_FACEBOOK, CLIENTID_GOOGLE } from "../../Common/Const/Auth/AuthConst";
import { notify } from "../../libs/Notify/Notify";
import { LOGIN_DONT_MATCH } from "../../Common/Const/Notify/NotifyConst";

function LoginForm(props) {
  const dispatch = useDispatch();

  const onLoginSuccess = (res) => {
    if(res){
    const values = {
      tendn: res?.profileObj?.email,
      matkhau: res?.profileObj?.googleId,
      hinhanh: res?.profileObj?.imageUrl,
      hoten: res?.profileObj?.givenName,
      nhacungcap: "GOOGLE",
    };
    dispatch({
      type: LOGIN_WITH_OAUTH2_ACTION,
      values,
    });
    }
  };

  const onLoginFailed = (res) => {
    // notify('error','Đăng nhập thất bại')
  };

  const responseFacebook = (res) => {
    const values = {
      tendn: res?.email,
      matkhau: res?.id,
      hinhanh: res?.picture?.data?.url,
      hoten: res?.name,
      nhacungcap: _?.upperCase(res?.graphDomain),
    };
    console.log("RESPONSE FROM FACEBOOK",res)
    if(!_.isEqual(res?.status,"unknown")){
      dispatch({
        type: LOGIN_WITH_OAUTH2_ACTION,
        values,
      });
    }else{
      notify('error',LOGIN_DONT_MATCH)
    }
  };

  const [showModal, setShowModal] = useState(false);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { visible } = useSelector((state) => state.ModalReducer);
  useEffect(() => {
    dispatch({
      type: Type.SET_SUBMIT_FORM_MODAL,
      functionSubmit: handleSubmit,
    });
  }, []);

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="form-group">
                <Field
                  type="email"
                  name="tendn"
                  onChange={handleChange}
                  className="input-responsive rounded-md"
                  placeholder={"bachmoc@gmail.com"}
                />
        
              <ErrorMessage name="tendn">
                {(msg) => {
                  return <p className="text-left text-red-600 text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="form-group">
                <Field
                  type="password"
                  name="matkhau"
                  onChange={handleChange}
                  className="input-responsive rounded-md"
                  placeholder={"*******"}
                />
              <ErrorMessage name="matkhau">
                {(msg) => {
                  return <p className="text-left text-red-600 text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <a
            className="text-green-700 hover:text-green-900"
            onClick={() => {
              dispatch({
                type: Type.OPEN_SUB_MODAL,
              });
            }}
          >
            Quên mật khẩu?
          </a>
        </div>
        <div className="flex flex-wrap justify-center m-5">
          <button className="button-primary rounded-md text-responsive" type="submit">
            Đăng nhập
          </button>
        </div>
        <div className="flex justify-center mb-5"><span className="text-gray-400">Hoặc tiếp tục bằng</span></div>
        <div className="flex flex-row flex-wrap">
          <div className="flex w-2/4 justify-end">
            <GoogleLogin
              clientId={CLIENTID_GOOGLE}
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailed}
              render={(renderProps) => (
                <span
                  title="Gmail"
                  className="rounded-full button-google"
                  onClick={renderProps.onClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    className="w-8 h-8"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                  </svg>
                </span>
              )}
            />
          </div>
          <div className="w-2/4">
            <FacebookLogin
              appId={APPID_FACEBOOK}
              fields="name,email,picture"
              callback={responseFacebook}
              scope="public_profile, email, user_birthday"
              render={(renderProps) => (
                <span
                title="Facebook"
                className="rounded-full button-facebook"
                onClick={renderProps.onClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    className="w-8 h-8"
                  >
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                  </svg>
                </span>
              )}
            />
            
          </div>
        </div>
      </form>
      <ForgotForm showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

const loginForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      tendn: "",
      matkhau: "",
    };
  },
  validationSchema: loginSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: LoginAction.LOGIN_ACTION,
      values,
    });
  },
  displayName: "LoginForm",
})(LoginForm);

export default connect(null)(loginForm);
