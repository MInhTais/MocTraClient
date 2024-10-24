import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import { categorySchema } from "../../../validates/CategoryValidation";
import { Tag, Tooltip } from "antd";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";
import { roleSchema } from "../../../validates/UserValidation";

function EditRole(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    categoryname: "",
    description: "",
  });
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { edit } = useSelector((state) => state.DrawerModalReducer);

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
              <label>Mã vai trò: </label>
              {edit ? <p><Tag color={'green'}>{values?.mavt}</Tag></p> : 
              <>
                <Field
                name="mavt"
                value={values.mavt}
                className="input-responsive"
                type="text"
                placeholder="ADMIN"
                onChange={handleChange}
                />
                <ErrorMessage name="mavt">
                    {(msg)=>{
                        return <p className="text-error">{msg}</p>
                    }}
                </ErrorMessage>
              </>}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="form-group">
              <label>Tên vai trò: </label>
              <Field
                type="text"
                value={!values.tenvt ? "" : values.tenvt}
                name="tenvt"
                className="input-responsive"
                placeholder="QUẢN TRỊ"
                onChange={handleChange}
              />
              <ErrorMessage name="tenvt">
                {(msg) => {
                  return (
                    <p className="text-red-600 text-left text-xs">{msg}</p>
                  );
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const EditRoleForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { roleEdit } = props;
    return {
      mavt: roleEdit?.mavt,
      tenvt: roleEdit?.tenvt,
    };
  },
  validationSchema: roleSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const {dispatch,edit} = props; 
    dispatch({
      type: edit
        ? AdminAction.UPDATE_ROLE_ADMIN_ACTION
        : AdminAction.ADD_ROLE_ADMIN_ACTION,
      role: values,
    });
  },
  displayName: "EditRoleForm",
})(EditRole);

const mapStateToProps = (state) => ({
  roleEdit: state.EditReducer.roleEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditRoleForm);
