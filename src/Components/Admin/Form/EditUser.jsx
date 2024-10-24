import { DatePicker, InputNumber, Radio, Tooltip } from "antd";
import { withFormik, ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Action from "../../../Common/Const/Admin/Drawer";
import { userManagementSchema, userManagementSchemaEdit, userSchema } from "../../../validates/UserValidation";
import moment from "moment";
import * as AdminAction from '../../../Common/Action/Admin/AdminAction';

function EditUser(props) {
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
  const { visible, edit } = useSelector((state) => state.DrawerModalReducer);
  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
  }, []);

  const dateFormat = "YYYY/MM/DD";

  return (
    <div className="container-fluid w-full">
      <form onSubmit={handleSubmit}>
        {!edit ? (
          <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label className="float-left">Tên đăng nhập</label>
                <Field
                  type="email"
                  name="tendn"
                  value={!values.tendn ? '' : values.tendn}
                  className="input-responsive"
                  onChange={handleChange}
                  placeholder="Bách Mộc"
                />
              <ErrorMessage name="tendn">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div> 
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Mật khẩu</label>
              <Field
                className="input-responsive"
                type="password"
                name="matkhau"
                placeholder="0701231231"
                value={!values.matkhau ? '' : values.matkhau}
                onChange={handleChange}
              />
             <ErrorMessage name="matkhau">
               {(msg)=>{
                 return <p className="text-red-600 text-left text-xs">{msg}</p>
               }}
             </ErrorMessage>
            </div>
          </div>
        </div>
        ): ''
      }
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label className="text-left">Họ tên</label>
                <Field
                  type="text"
                  name="hoten"
                  value={!values.hoten ? '' : values.hoten}
                  className="input-responsive"
                  onChange={handleChange}
                  placeholder="Bách Mộc"
                />
              <ErrorMessage name="hoten">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div> 
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Số điện thoại</label>
              <Field
                className="input-responsive"
                name="sdt"
                placeholder="0701231231"
                value={!values.sdt ? '' : values.sdt}
                rows="4"
                onChange={handleChange}
              />
             <ErrorMessage name="sdt">
               {(msg)=>{
                 return <p className="text-red-600 text-left text-xs">{msg}</p>
               }}
             </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Giới tính</label>
              <br />
              <br />
              <Radio.Group
                name="gioitinh"
                defaultValue={!values.gioitinh ? true : values.gioitinh}
                buttonStyle="solid"
                className="text-left"
                onChange={(e)=>{
                  let {value} = e.target;
                  setFieldValue('gioitinh',value);
                }}
              >
                <Radio.Button value={true}>Nam</Radio.Button>
                <Radio.Button value={false}>Nữ</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Kích hoạt</label>
              <br />
              <br />
              <Radio.Group
                name="kichhoat"
                defaultValue={!values.kichhoat ? false : values.kichhoat}
                buttonStyle="solid"
                className="text-left"
                onChange={(e)=>{
                  let {value} = e.target;
                  setFieldValue('kichhoat',value);
                }}
              >
                <Radio.Button value={true}>Kích hoạt</Radio.Button>
                <Radio.Button value={false}>Khóa</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Ngày sinh</label>
              <br />
              <br />
              <DatePicker
                className="text-left"
                format={dateFormat}
                name="ngaysinh"
                defaultValue={!values.ngaysinh ? moment(new Date(), dateFormat) : moment(values?.ngaysinh, dateFormat)}
                onChange={(e)=>{
                  let {_d} = e ? e : new Date();
                  setFieldValue('ngaysinh', !_d  ? new Date() : _d);
                }}
              />
              <ErrorMessage name="ngaysinh">
                {(msg) =>{
                  return <p className="text-red-600 text-left text-xs">{msg}</p>
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="text-left">Điểm</label>
              <br />
              <br />
              <InputNumber
                style={{
                  width: 200,
                }}
                value={!values.tichdiem ? '' : values.tichdiem}
                min="0"
                max="10000000"
                step="1000"
                name="tichdiem"
                onChange={(e)=>{
                  setFieldValue('tichdiem', e);
                }}
              />
              <ErrorMessage name="tichdiem">
                {(msg)=>{
                  return <p className="text-red-600 text-left text-xs">{msg}</p>
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props)=>{
        const {userEdit} = props;
        return {
            tendn: userEdit?.tendn,
            matkhau: userEdit?.matkhau,
            hoten: userEdit?.hoten,
            gioitinh: userEdit?.gioitinh,
            kichhoat: userEdit?.kichhoat,
            tichdiem: userEdit?.tichdiem ? userEdit?.tichdiem : 0,
            ngaysinh: userEdit?.ngaysinh,
            sdt: userEdit?.sdt
        };
    },
    validationSchema: (props)=>{
      const {edit} = props;
      return !edit ? userManagementSchema : userManagementSchemaEdit;
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const {dispatch, edit} = props;
      dispatch({
        type: edit ? AdminAction.UPDATE_USER_ACTION :AdminAction.ADD_USER_ACTION,
        user: values
      })
    },
    displayName: "EditProviderForm",
  })(EditUser);

const mapStateToProps = (state) => ({
  userEdit: state.EditReducer.userEdit,
  edit: state.DrawerModalReducer.edit
});
export default connect(mapStateToProps)(EditUserForm);
