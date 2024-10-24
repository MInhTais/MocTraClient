import { Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Type from "../../../Common/Const/Admin/Drawer";
import _ from 'lodash';
export default function EditDrawer(props) {
  const {
    visible,
    ComponentContentDrawer,
    callBackSubmit,
    title,
    placement,
    renderFooter,
    nameButton,
    disabled
  } = useSelector((state) => state.DrawerModalReducer);
  const dispatch = useDispatch();
  const size = useWindowSize();
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      if(window.innerWidth>=780){
        onClose();
      }
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowSize;
  }
  const onClose = () => {
    if(size.width >= 780){
      dispatch({
        type: Type.CLOSE_DRAWER,
      });
    }
    dispatch({
      type: Type.CLOSE_DRAWER,
    });
  };

  return (
    <>
      <Drawer
        title={title}
        width={
          renderFooter ? ( size.width>= 1280
            ? "40%"
            : size.width>= 540
            ? "60%"
            : "80%"):( size.width>= 1280
              ? "30%"
              : size.width>= 540
              ? "50%" : size.width>375 ? "80%" 
              : "90%")
        }
        onClose={onClose}
        visible={size?.width>=1020 && _.isEqual(title,'MENU') ? false :visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
        placement={placement}
        keyboard={true}
        footer={renderFooter ? <div style={{ textAlign: "right" }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Hủy bỏ
        </Button>
        <Button onClick={callBackSubmit} type="primary" disabled={disabled}>
          {nameButton ? nameButton : 'Chỉnh sửa' }
        </Button>
      </div> : false}
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
