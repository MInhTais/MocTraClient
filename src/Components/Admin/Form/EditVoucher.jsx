import React, { useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";
import { voucherSchema } from "../../../validates/VoucherValidation";
import { InputNumber } from "antd";

function EditVoucher(props) {
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
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <div className="container-fluid w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="form-group">
              <label>Tên mã giảm giá: </label>
              <Field
                type="text"
                value={!values.tenloaigg ? "" : values.tenloaigg}
                name="tenloaigg"
                className="input-responsive"
                placeholder="Miễn phí vận chuyển"
                onChange={handleChange}
              />
              <ErrorMessage name="tenloaigg">
                  {(msg)=>{
                      return <p className="text-error">{msg}</p>
                  }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="flex flex-col">
              <label>Giá giảm</label>
              <InputNumber
                min={1000}
                value={values?.giagiam}
                bordered={false}
                name="giagiam"
                className="input-responsive"
                placeholder="1000"
                step={1000}
                onChange={(e) => {
                  setFieldValue("giagiam", e);
                }}
              />
              <ErrorMessage name="giagiam">
                {(msg)=>{
                  return <p className="text-error">{msg}</p>
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col">
              <label>Giá trị tối thiểu</label>
              <InputNumber
                min={1000}
                step={1000}
                value={values?.giatritoithieu}
                bordered={false}
                name="giatritoithieu"
                className="input-responsive"
                placeholder="1000"
                onChange={(e) => {
                  setFieldValue("giatritoithieu", e);
                }}
              />
              <ErrorMessage name="giatritoithieu">
                {(msg) => {
                  return <p className="text-red-600 text-left text-xs">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditVoucherForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { voucherEdit } = props;
    return {
      maloaigg: voucherEdit?.maloaigg,
      hinhanh:voucherEdit?.hinhanh,
      tenloaigg: voucherEdit?.tenloaigg,
      giagiam: voucherEdit?.giagiam ? voucherEdit?.giagiam : 1000,
      giatritoithieu:  voucherEdit?.giatritoithieu ? voucherEdit?.giatritoithieu : 1000,
    };
  },
  validationSchema: voucherSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch, edit } = props;
    dispatch({
      type: edit
        ? AdminAction.UPDATE_VOUCHER_ADMIN_ACTION
        : AdminAction.ADD_VOUCHER_ADMIN_ACTION,
      voucher: values,
    });
  },
  displayName: "EditVoucherForm",
})(EditVoucher);

const mapStateToProps = (state) => ({
  voucherEdit: state.EditReducer.voucherEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditVoucherForm);
