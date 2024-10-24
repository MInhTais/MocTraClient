import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as Type from "../../Common/Const/Modal/ModalConst";
export default function ModalForm(props) {
  const dispatch = useDispatch();
  const { visible, Component, functionSubmit, title, width } = useSelector(
    (state) => state.ModalReducer
  );
  const onClose = () => {
    dispatch({
      type: Type.CLOSE_MODAL,
    });
  };

  return (
    <>
        <Modal
          width={width}
          title={title}
          visible={visible}
          className="my-modal"
          onOk={functionSubmit}
          onCancel={onClose}
          okText={title}
          cancelText="Hủy bỏ"
          footer={null}
          keyboard={true}
        >
          {Component}
        </Modal>

    </>
  );
}
