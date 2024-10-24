import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_FAST_USER_ACTION } from "../../../Common/Action/Admin/AdminAction";

export default function ViewFastUserComponent(props) {
  const { record } = props;
  const dispatch = useDispatch();
  const { xemctnd } = useSelector((state) => state.AdminReducer);
  useEffect(() => {
    if (record?.tk?.tendn) {
      dispatch({
        type: VIEW_FAST_USER_ACTION,
        username: record?.tk?.tendn,
      });
    }
  }, []);
  return (
    <div className="w-full container flex flex-col justify-center">
      <div className="flex flex-row w-full gap-2 mb-3">
        <h3>THÔNG TIN NGƯỜI DÙNG</h3>
      </div>
      <div className="flex flex-row w-full gap-2">
        <label>Email: </label>
        <p>{record?.tk.tendn}</p>
      </div>
      <div className="flex flex-row w-full gap-2">
        <label>Họ tên: </label>
        <p>{record?.tk?.hoten}</p>
      </div>
      <div className="flex flex-row w-full gap-2">
        <label>Tổng số lần mua hàng: </label>
        <p>{xemctnd?.orders?.length}</p>
      </div>
      <div className="flex flex-row w-full gap-2">
        <label>Tổng số lần đánh giá: </label>
        <p>{xemctnd?.reviews?.length}</p>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <Rate character={<HeartOutlined />} disabled value={1} />
          </div>
          <div className="w-1/4">
            {_.filter(xemctnd?.reviews, (e) => e.danhgia === 1)?.length}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <Rate character={<HeartOutlined />} disabled value={2} />
          </div>
          <div className="w-1/4">
            {_.filter(xemctnd?.reviews, (e) => e.danhgia === 2)?.length}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <Rate character={<HeartOutlined />} disabled value={3} />
          </div>
          <div className="w-1/4">
            {_.filter(xemctnd?.reviews, (e) => e.danhgia === 3)?.length}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <Rate character={<HeartOutlined />} disabled value={4} />
          </div>
          <div className="w-1/4">
            {_.filter(xemctnd?.reviews, (e) => e.danhgia === 4)?.length}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-3/4">
            <Rate character={<HeartOutlined />} disabled value={5} />
          </div>
          <div className="w-1/4">
            {_.filter(xemctnd?.reviews, (e) => e.danhgia === 5)?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
