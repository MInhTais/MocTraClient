import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, withFormik } from "formik";
import * as Action from "../../../Common/Const/Admin/Drawer";
import * as actionAdmin from "../../../Common/Action/Admin/AdminAction";
import { rewardSchema } from "../../../validates/EventValidation";
import _ from "lodash";
import EventComponent from "../Events/EventComponent";

function EditReward(props) {
  const dispatch = useDispatch();
  
  const { reward } = useSelector((state) => state.AdminReducer);
  const {edit} = useSelector(state => state.DrawerModalReducer)
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

    if (values?.sk) {
      dispatch({
        type: actionAdmin.FIND_ALL_REWARD_BY_EVENT_ID_ACTION,
        event: values.sk,
      });
    }
  }, []);


  return (
    <div className="container w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center gap-y-4"
      >
        <div className="flex flex-col gap-y-4">
          <div className="w-full">
            <div className="flex flex-col">
              <label>Tên phần thưởng: </label>
              <Field
                type="text"
                value={!values.phanthuong ? "" : values.phanthuong}
                name="phanthuong"
                className="input-nb"
                onChange={handleChange}
              />
              <ErrorMessage name="phanthuong">
                {(msg) => {
                  return <p className="text-error">{msg}</p>;
                }}
              </ErrorMessage>
            </div>
          </div>
        </div>
        
      </form>
      {edit ? <EventComponent values={values} /> : null}
    </div>
  );
}

const EditRewardForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { rewardEdit } = props;
    return {
      mapt: rewardEdit?.mapt,
      ctpt: rewardEdit?.ctpt,
      phanthuong: rewardEdit?.phanthuong,

    };
  },
  validationSchema: rewardSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch, edit } = props;
    dispatch({
      type: edit ? actionAdmin.UPDATE_REWARD_ACTION : actionAdmin.ADD_REWARD_ACTION,
      reward: values,
    });
  },
  displayName: "EditRewardForm",
})(EditReward);

const mapStateToProps = (state) => ({
  rewardEdit: state.EditReducer.rewardEdit,
  edit: state.DrawerModalReducer.edit,
});

export default connect(mapStateToProps)(EditRewardForm);
