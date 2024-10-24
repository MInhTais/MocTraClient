import React, { useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { ErrorMessage, withFormik, Field } from "formik";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as actionAdmin from "../../../Common/Action/Admin/AdminAction";
import { partnerSchema } from "../../../validates/ProviderValidation";

function EditPartner(props) {
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

    dispatch({
      type: actionAdmin.FIND_ALL_ACTION,
    });
  }, []);

  return (
    <div className="container w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="w-full">
            <div className="flex flex-wrap mb-3 mr-4">
              <label>Tên cửa hàng: </label>
              <Field
                type="text"
                value={!values.tencuahang ? "" : values.tencuahang}
                name="tencuahang"
                className="input-nb"
                placeholder="Cửa hàng Mộc Trà"
                onChange={handleChange}
              />
              <ErrorMessage name="tencuahang">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-wrap mb-3">
              <label>Họ tên: </label>
              <Field
              type="text"
              value={values?.chucuahang ? values?.chucuahang : ""}
              className="input-nb"
              placeholder="Mộc Trà"
              name="chucuahang"
              onChange={handleChange}
              />
              <ErrorMessage name="chucuahang">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditPartnerForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { partnerEdit } = props;
    return {
      mancc: partnerEdit?.mancc,
      tencuahang: partnerEdit?.tencuahang,
      chucuahang: partnerEdit?.chucuahang,
      pheduyet: partnerEdit?.pheduyet,
      tkchucuahang: partnerEdit?.tkchucuahang
    };
  },
  validationSchema: partnerSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch } = props;
    dispatch({
      type: actionAdmin.UPDATE_PARTNER_ACTION,
      partner: values,
    });
  },
  displayName: "EditPartnerForm",
})(EditPartner);

const mapStateToProps = (state) => ({
  partnerEdit: state.EditReducer.partnerEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditPartnerForm);
