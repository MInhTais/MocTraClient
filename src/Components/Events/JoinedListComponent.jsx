import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FIND_ALL_REWARD_JOINED_ACTION } from "../../Common/Action/Authentication/AuthAction";

export default function JoinedListComponent() {
  const { joined } = useSelector((state) => state.isAuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: FIND_ALL_REWARD_JOINED_ACTION,
    });
  }, []);
  return (
    <div className="w-full flex flex-col justify-center bg-gradient-to-r from-green-100 to-yellow-100">
      <div className="p-4 flex flex-col">
        <h4 className="text-2xl">SỰ KIỆN ĐÃ KẾT THÚC</h4>
        <h4 className="text-xs">CÁM ƠN BẠN ĐÃ THAM GIA CHƯƠNG TRÌNH</h4>
      </div>
      <div className="w-full flex flex-col justify-center p-5">
        <h4>GIẢI THƯỞNG SỰ KIỆN VỪA QUA</h4>
        <div className="w-full flex flex-row justify-center gap-6 pt-5">
          <h4 className="w-1/3">STT</h4>
          <h4 className="w-1/3">HỌ TÊN</h4>
          <h4 className="w-1/3">GIẢI THƯỞNG</h4>
        </div>
        {_?.map(joined, (item, i) => {
          return (
            <div className="w-full cursor-pointer flex flex-row justify-center gap-6 p-2 hover:bg-green-50 fold:mt-5 md:gap-y-0" key={i}>
              <h4 className="w-1/3"><label className="cursor-pointer animate-pulse hover:animate-bounce">{i+1}</label></h4>
              <h4 className="w-1/3"><label className="cursor-pointer animate-pulse hover:animate-bounce">{item?.tk?.hoten}</label></h4>
              <h4 className="w-1/3"><label className=" cursor-pointer animate-pulse hover:animate-bounce">{item.phanthuong}</label></h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
