import React, { useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import { providerSchema } from "../../../validates/ProviderValidation";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";

function EditProvider(props) {
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
    <div className="container w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <div className="flex fold:flex-col fold:gap-y-4 md:flex-row md:gap-4">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap">
              <label>Tên nhà cung cấp: </label>
              <Field
                type="text"
                value={!values.tenncc ? "" : values.tenncc}
                name="tenncc"
                className="input-nb"
                placeholder="Công ty TNHH MTV Bách Mộc"
                onChange={handleChange}
              />
              <ErrorMessage name="tenncc">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-wrap">
              <label>Số điện thoại: </label>
                <Field
                  type="text"
                  value={!values.sdt ? "" : values.sdt}
                  name="sdt"
                  className="input-nb"
                  placeholder="0701231223"
                  onChange={handleChange}
                />
              <ErrorMessage name="sdt">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <label>Địa chỉ</label>
              <textarea
                className="input-responsive"
                name="diachi"
                placeholder="Cầu Quan - Tiểu Cần - Trà Vinh"
                value={!values.diachi ? "" : values.diachi}
                onChange={handleChange}
              ></textarea>
            <ErrorMessage name="diachi">
              {(msg) => {
                return <p className="text-error">{msg}</p>;
              }}
            </ErrorMessage>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditProviderForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { providerEdit } = props;
    return {
      mancc: providerEdit?.mancc,
      tenncc: providerEdit?.tenncc,
      diachi: providerEdit?.diachi,
      sdt: providerEdit?.sdt,
      trangthai: providerEdit?.trangthai
    };
  },
  validationSchema: providerSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const {dispatch,edit} = props;
    dispatch({
      type: edit
        ? AdminAction.UPDATE_PROVIDER_ACTION
        : AdminAction.ADD_PROVIDER_ACTION,
      provider: values,
    });
  },
  displayName: "EditProviderForm",
})(EditProvider);

const mapStateToProps = (state) => ({
  providerEdit: state.EditReducer.providerEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditProviderForm);
