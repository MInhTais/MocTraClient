import { ErrorMessage, Field, withFormik } from "formik";
import _ from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRODUCT_SELLER_ACTION } from "../../Common/Action/Admin/SellerAction";
import { SIGN_UP_SHOP_ACTION } from "../../Common/Action/Signup/SignupAction";
import { SELLER } from "../../Common/Const/Auth/AuthConst";
import { SET_SUBMIT_FORM_MODAL } from "../../Common/Const/Modal/ModalConst";
import { signupShopSchema } from "../../validates/Signup";

function SignupShopForm(props) {
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.AuthReducer);
    const { nhacungcap } = useSelector((state) => state.SellerReducer);

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
        type: SET_SUBMIT_FORM_MODAL,
        functionSubmit: handleSubmit,
      });
      dispatch({
        type: GET_ALL_PRODUCT_SELLER_ACTION,
      });
    }, []);
  

    const renderForm = () =>{
      return _.find(credentials?.roles, e=> e===SELLER) && nhacungcap?.cuahang ? 
      <div className="container">
        <div className="w-full flex flex-col justify-center">
        <div>
            <p>Chào {credentials?.hoten}, Trà vừa tìm thấy bạn đã đăng ký cửa hàng của Trà rồi.</p>
            </div>
          <div>
            <img src ="https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-700.jpg" />
          </div>
        </div>
      </div>
      
      : <div className="container">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col justify-center w-full">
        <div className="flex flex-row gap-8 mb-4">
          <div className="flex flex-col w-full">
            <span>Tên doanh nghiệp/ cửa hàng <span className="text-red-600">*</span></span>
            <Field className="input-nb" autoFocus name="tenncc" placeholder="" onChange={handleChange} />
            <ErrorMessage name="tenncc">
                {(msg)=>{
                    return (
                        <p className="text-red-600 text-left text-xs mt-2">{msg}</p>
                    )
                }}
            </ErrorMessage>
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          <div className="flex flex-col w-1/2">
            <span>Địa chỉ <span className="text-red-600">*</span></span>
            <Field className="input-nb" name="diachi" placeholder="" onChange={handleChange} />
            <ErrorMessage name="diachi">
                {(msg)=>{
                    return (
                        <p className="text-red-600 text-left text-xs mt-2">{msg}</p>
                    )
                }}
            </ErrorMessage>
          </div>
          <div className="flex flex-col w-1/2">
            <span>Tên cửa hàng <span className="text-red-600">*</span></span>
            <Field className="input-nb" name="tencuahang" placeholder="" onChange={handleChange} />
            <ErrorMessage name="tencuahang">
                {(msg)=>{
                    return (
                        <p className="text-red-600 text-left text-xs mt-2">{msg}</p>
                    )
                }}
            </ErrorMessage>
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          <div className="flex flex-col w-1/2">
            <span>Họ tên <span className="text-red-600">*</span></span>
            <Field className="input-nb" name="chucuahang" placeholder="" onChange={handleChange} />
            <ErrorMessage name="chucuahang">
                {(msg)=>{
                    return (
                        <p className="text-red-600 text-left text-xs mt-2">{msg}</p>
                    )
                }}
            </ErrorMessage>
          </div>
          <div className="flex flex-col w-1/2">
            <span>Số điện thoại <span className="text-red-600">*</span></span>
            <Field className="input-nb" name="sdt" placeholder="" onChange={handleChange} />
            <ErrorMessage name="sdt">
                {(msg)=>{
                    return (
                        <p className="text-red-600 text-left text-xs mt-2">{msg}</p>
                    )
                }}
            </ErrorMessage>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <button type="submit" className="button-3d-green">
            ĐĂNG KÝ
          </button>
        </div>
      </form>
    </div>
    }

  return (
    <>
    {renderForm()}
    </>
  );
}

const signUpShopForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) =>{
      return {
        tenncc:'',
        sdt:'',
        diachi:'',
        tencuahang:'',
        chucuahang:''
      }; 
    },
    validationSchema: signupShopSchema,
    handleSubmit: (values, {props, setSubmitting})=>{
    const {dispatch} = props;
      dispatch({
        type: SIGN_UP_SHOP_ACTION,
        values
      })
    },
    displayName:'SignUpForm'
  })(SignupShopForm)
  
  export default connect(null)(signUpShopForm)
