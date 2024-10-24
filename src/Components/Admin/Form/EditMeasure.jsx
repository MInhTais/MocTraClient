import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import { measureSchema } from "../../../validates/MeasureValidation";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as AdminAction from "../../../Common/Action/Admin/AdminAction";
import _ from "lodash";
import { measureList } from "../../../Common/Const/Admin/MeasureReferences";
import { AutoComplete, Input } from "antd";
import { FiCopy } from "react-icons/fi";
import { BiMessageSquareX } from "react-icons/bi";

function EditMeasure(props) {
  const dispatch = useDispatch();
  const { edit } = useSelector((state) => state.DrawerModalReducer);
  const { dvd } = useSelector((state) => state.AdminReducer);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const [measureName, setMeasureName] = useState("");
  const searchRef = useRef(null);
  const [duplicate, setDuplicate] = useState(false);
  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });
  }, []);
  const notAllowEdit = "input-responsive cursor-not-allowed";
  const AllowEdit = "input-responsive";
  return (
    <div className="container-fluid w-full flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex fold:flex-col fold:gap-2 md:flex-row md:gap-6">
          <div className="fold:w-full md:w-1/2">
            <div className="flex flex-col mb-4">
              <label>Mã đơn vị tính: </label>
              <Field
                type="text"
                name="madvd"
                className={edit ? notAllowEdit : AllowEdit}
                placeholder="LTR"
                value={!values.madvd ? "" : values.madvd}
                disabled={edit ? true : false}
                onChange={(e) => {
                  let { value } = e.target;
                  setFieldValue("madvd", value);
                  if (_.find(dvd, (dv) => dv.madvd === value)) {
                    dispatch({
                      type: Action.DISABLED_BUTTON,
                    });
                  } else {
                    dispatch({
                      type: Action.ABLE_BUTTON,
                    });
                  }
                }}
              />
              <ErrorMessage name="madvd">
                {(msg) => {
                  return (
                    <p className="text-left text-red-600 text-xs">{msg}</p>
                  );
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="fold:w-full md:w-1/2">
            <div className="form-group">
              <label>Tên đơn vị tính: </label>
              <Field
                type="text"
                value={!values.tendvd ? "" : values.tendvd}
                name="tendvd"
                className="input-responsive"
                placeholder="Lít"
                onChange={handleChange}
              />
              <ErrorMessage name="tendvd">
                {(msg) => {
                  return (
                    <p className="text-left text-red-600 text-xs">{msg}</p>
                  );
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
      </form>
      {edit ? null : (
        <div>
          <div className="flex flex-row justify-center mt-3">
            <p className="font-bold font-sans">
              BẢNG THAM KHẢO ĐƠN VỊ TÍNH QUỐC TẾ
            </p>
          </div>
          <div>
            <AutoComplete
              className="w-full flex justify-center"
              value={measureName}
              onChange={(value) => {
                setMeasureName(value);
              }}
              onSelect={(value, option) => {
                setMeasureName(option.label);
                let measure = _.find(measureList, (e) => e.id === value);
                setFieldValue("madvd", measure.id);
                setFieldValue("tendvd", measure.name);
                if (_.find(dvd, (dv) => dv.madvd === value)) {
                  dispatch({
                    type: Action.DISABLED_BUTTON,
                  });
                } else {
                  dispatch({
                    type: Action.ABLE_BUTTON,
                  });
                }
              }}
              options={_?.map(measureList, (measure) => {
                return { label: measure.name, value: measure.id };
              })}
              onSearch={(value) => {
                if (searchRef !== null) {
                  clearTimeout(searchRef.current);
                }
              }}
              filterOption={(inputValue, option) =>
                _.indexOf(
                  _.upperCase(option.label),
                  _.upperCase(inputValue)
                ) !== -1
              }
            >
              <Input.Search
                size="large"
                placeholder="Chọn đơn vị tính"
                enterButton
                type="submit"
              />
            </AutoComplete>
          </div>
          <div className="h-96 overflow-auto mt-5">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/3">Mã viết tắt</th>
                  <th className="w-1/3">Tên tiếng việt</th>
                  <th className="w-1/3">
                    <p className="w-full flex justify-center">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {_.map(measureList, (item, i) => {
                  return (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="text-left flex justify-center px-6 py-4 whitespace-nowrap">
                        {_.find(dvd, (dv) => dv.madvd === item.id) ? (
                          <BiMessageSquareX className="text-lg text-gray-400 text-opacity-50 cursor-not-allowed" />
                        ) : (
                          <FiCopy
                            className="edit-icon text-gray text-lg hover:animate-bounce"
                            onClick={() => {
                              setMeasureName(item.name);
                              setFieldValue("madvd", item.id);
                              setFieldValue("tendvd", item.name);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const EditMeasureForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { measureEdit } = props;
    return {
      madvd: measureEdit?.madvd,
      tendvd: measureEdit?.tendvd,
    };
  },
  validationSchema: measureSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch, edit } = props;
    dispatch({
      type: edit
        ? AdminAction.UPDATE_MEASURE_ACTION
        : AdminAction.ADD_MEASURE_ACTION,
      measure: values,
    });
  },
  displayName: "EditMeasureForm",
})(EditMeasure);

const mapStateToProps = (state) => ({
  measureEdit: state.EditReducer.measureEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditMeasureForm);
