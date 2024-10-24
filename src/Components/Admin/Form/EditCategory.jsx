import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import { categorySchema } from "../../../validates/CategoryValidation";
import { Tooltip } from "antd";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";

function EditCategory(props) {
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
  const { visible } = useSelector((state) => state.DrawerModalReducer);

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
              <label>Tên nhóm: </label>
              <Field
                type="text"
                value={!values.tennhom ? "" : values.tennhom}
                name="tennhom"
                className="input-responsive"
                placeholder="Thực phẩm đông lạnh"
                onChange={handleChange}
              />
              <ErrorMessage name="tennhom">
                {(msg) => {
                  return (
                    <p className="text-red-600 text-left text-xs">{msg}</p>
                  );
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="flex flex-col">
              <label>Mô tả</label>
              <textarea
                className="input-responsive"
                name="mota"
                placeholder="Cầu Quan - Tiểu Cần - Trà Vinh"
                value={!values.mota ? "" : values.mota}
                rows="4"
                onChange={handleChange}
              ></textarea>

              <ErrorMessage name="mota">
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

const EditCategoryForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { categoryEdit } = props;
    return {
      manhom: categoryEdit?.manhom,
      tennhom: categoryEdit?.tennhom,
      mota: categoryEdit?.mota,
    };
  },
  validationSchema: categorySchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: props.edit
        ? AdminAction.UPDATE_CATEGORY_ACTION
        : AdminAction.ADD_CATEGORY_ACTION,
      category: values,
    });
  },
  displayName: "EditCategoryForm",
})(EditCategory);

const mapStateToProps = (state) => ({
  categoryEdit: state.EditReducer.categoryEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditCategoryForm);
