import { Avatar, Badge } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../libs/History/history";
import moment from "moment";
import _ from "lodash";
import { UPDATE_STATUS_READ_BY_USERNAME_ACTION } from "../../../Common/Action/Authentication/AuthAction";

export default function NotifyComponent() {
  const { notify,credentials } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  return (
    <>
      {credentials ? <div className="w-96 flex flex-col justify-center h-96 gap-y-4 z-auto">
      <div className="flex flex-row justify-center h-1/6">
        <div className="flex w-1/2 justify-start">
          <label className="text-xl font-bold">THÔNG BÁO</label>
        </div>
        <div className="flex w-1/2 justify-end">...</div>
      </div>
      <div className="w-full flex flex-col justify-center h-5/6 overflow-auto">
        <div className="h-full">
          {_?.map(notify, (n, i) => {
            return (
              <div
                className="cursor-pointer p-2 rounded-sm flex flex-row gap-2 container border-b-2 border-green-50 hover:bg-gray-50 gap-y-1 hover:shadow-md"
                key={i}
                onClick={() => {
                  n.dadoc = !n.dadoc;
                  dispatch({
                    type:UPDATE_STATUS_READ_BY_USERNAME_ACTION,
                    username: credentials?.tendn,
                    notify: n
                  })
                  history.push(`${n.url}`);
                }}
              >
                <div>
                  <Avatar src={credentials?.hinhanh ? 'http://localhost:8080/images/user/'+credentials?.hinhanh : 'https://joeschmoe.io/api/v1/random'} />
                </div>
                <div>
                  <div className="w-full flex flex-row justify-center">
                    <label>{n.thongbao}</label>
                    {n.dadoc ? null : (
                      <Badge color="green" status="processing" />
                    )}
                  </div>
                  <label className="text-xs">
                    {moment(n.ngaytb).format("DD/MM/YYYY HH:mm:ss")}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div> : <div className="w-96 flex flex-col justify-center justify-items-center h-96 gap-y-4 z-auto">VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG CHỨC NĂNG THÔNG BÁO</div>}
    </>
  );
}
