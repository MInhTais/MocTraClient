import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, withFormik } from "formik";
import { DatePicker, InputNumber, Tag, Table, Popover } from "antd";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as actionAdmin from "../../../Common/Action/Admin/AdminAction";
import moment from "moment";
import { eventSchema } from "../../../validates/EventValidation";
import _ from "lodash";

const { RangePicker } = DatePicker;

function EditEvent(props) {
  const dispatch = useDispatch();
  
  const {
    size,
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const { ptsk } = useSelector((state) => state.AdminReducer);

  useEffect(() => {
    dispatch({
      type: Action.SET_SUBMIT_FORM,
      submitFunction: handleSubmit,
    });

    dispatch({
      type: actionAdmin.FIND_ALL_ACTION,
    });
  }, []);

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function disabledRangeTime(_, type) {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(0, 0),
        disabledMinutes: () => range(0, 60).splice(0,0),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }
 

 
  return (
    <div className="container w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div className="w-full">
            <div className="flex flex-col">
              <label>Tên sự kiện: </label>
              <input
                type="text"
                value={!values.tensk ? "" : values.tensk}
                name="tensk"
                className="input-nb"
                placeholder="Vòng quay may mắn"
                onChange={handleChange}
              />
              <ErrorMessage name="tensk">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <label>Ngày bắt đầu/ kết thúc: </label>
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [
                    moment("00:00:00", "HH:mm:ss"),
                    moment("11:59:59", "HH:mm:ss"),
                  ],
                }}
                format="YYYY-MM-DD HH:mm:ss"
                defaultValue={[
                  moment(values?.ngaybatdau),
                  moment(values?.ngayketthuc),
                ]}
                onChange={(e) => {
                  setFieldValue("ngaybatdau", _.first(e)?._d);
                  setFieldValue("ngayketthuc", _.last(e)?._d);
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-4">
            <div className="flex flex-col w-1/2">
              <label>Giới hạn: </label>
              <InputNumber
                min={1}
                value={values?.gioihan ? values?.gioihan : 1}
                onChange={(e) => {
                  setFieldValue("gioihan", e);
                }}
                name="gioihan"
              />
              <ErrorMessage name="gioihan">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
            <div className="flex flex-col w-1/2">
              <label>Loại phần thưởng: </label>
              <select
                className="p-2 bg-white border-b-2 border-green-500 focus:border-green-700"
                name="ptsk"
                onChange={(e) => {
                  const { value } = e.target;
                  const pt = _.find(ptsk, (e) => e.mapt === value);
                  setFieldValue("ptsk", pt);
                }}
              >
                {_.map(ptsk, (e) => {
                  return (
                    <option key={e.phanthuong} value={e.mapt}>
                      {e.phanthuong}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </form>
      {/* <EventComponent size={size} values={values} /> */}
    </div>
  );
}

const EditEventForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { eventEdit } = props;
    return {
      mask: eventEdit?.mask,
      tensk: eventEdit?.tensk,
      ngaybatdau: eventEdit?.ngaybatdau ? eventEdit?.ngaybatdau : new Date(),
      ngayketthuc: eventEdit?.ngayketthuc,
      gioihan: eventEdit?.gioihan,
      ptsk: eventEdit?.ptsk,
    };
  },
  validationSchema: eventSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch, edit } = props;
    values.ngaybatdau = moment(values?.ngaybatdau)?._d;
    values.ngayketthuc =moment(values?.ngayketthuc)?._d;
    dispatch({
      type: edit
        ? actionAdmin.UPDATE_EVENT_ACTION
        : actionAdmin.ADD_EVENT_ACTION,
      event: values,
    });
  },
 
  displayName: "EditEventForm",
})(EditEvent);

const mapStateToProps = (state) => ({
  eventEdit: state.EditReducer.eventEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditEventForm);
