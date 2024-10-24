import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_REVIEW_OF_PRODUCT_BY_PROVIDERNAME_ACTION } from "../../../Common/Action/Admin/AdminAction";

export default function DetailShopComponent({ nhacungcap }) {
  const dispatch = useDispatch();
  const { tongdg } = useSelector((state) => state.AdminReducer);
  useEffect(() => {
    if (nhacungcap) {
      dispatch({
        type: GET_ALL_REVIEW_OF_PRODUCT_BY_PROVIDERNAME_ACTION,
        tenncc: nhacungcap?.tenncc,
      });
    }
  }, []);

  const renderDG = () => {
    return tongdg?.length > 0
      ? _.ceil(
          _?.reduce(
            _?.map(tongdg, (item) => item.danhgia),
            (total, dg) => (total += dg),
            0
          ) / tongdg.length,
          2
        )
      : 0;
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-row">
        <p>Tên cửa hàng: {nhacungcap?.cuahang?.tencuahang ? nhacungcap?.cuahang?.tencuahang: 'Mộc Trà'}</p>
      </div>
      {nhacungcap?.cuahang ? (
        <>
          <div className="flex flex-row">
            <p>Họ tên: {nhacungcap?.cuahang?.chucuahang}</p>
          </div>
          <div className="flex flex-row">
            <p>Email: {nhacungcap?.cuahang?.tkchucuahang?.tendn}</p>
          </div>
        </>
      ) : null}
      <div className="flex flex-row">
        <p>Tổng đánh giá: {renderDG()}</p>
      </div>
    </div>
  );
}
