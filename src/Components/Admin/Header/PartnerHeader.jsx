import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";

export default function PartnerHeader({ size }) {
  const { doitac } = useSelector((state) => state.AdminReducer);

  return (
    <div className="w-full container flex flex-row justify-center pt-5 fold:gap-2  md:gap-6">
      <div className="w-1/3">
        {size?.width >= 1280 ? (
          <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
            <Statistic
              title="Tổng cửa hàng"
              value={doitac?.length}
              valueStyle={{ color: "white" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        ) : (
          <div className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg h-24">
            <label className="text-xs p-2 text-white">Tổng cửa hàng</label>
            <p className="font-bold text-lg text-white p-2 -mt-6">
              {doitac?.length}
            </p>
          </div>
        )}
      </div>
      <div className="w-1/3">
        {size?.width >= 1280 ? (
          <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
            <Statistic
              title="Đang hoạt động"
              value={_.filter(doitac, (e) => e.pheduyet)?.length}
              valueStyle={{ color: "white" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        ) : (
          <div className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg h-24">
            <label className="text-xs p-2 text-white">Đang hoạt động</label>
            <p className="font-bold text-lg text-white p-2 -mt-6">
              {_.filter(doitac, (e) => e.pheduyet)?.length}
            </p>
          </div>
        )}
      </div>
      <div className="w-1/3">
        {size?.width >= 1280 ? (
          <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
            <Statistic
              title="Ngừng hoạt động/ tạm khóa"
              value={_.filter(doitac, (e) => !e.pheduyet)?.length}
              valueStyle={{ color: "black" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        ) : (
          <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg h-24">
            <label className="text-xs p-2 text-white">Ngừng hoạt động/ tạm khóa</label>
            <p className="font-bold text-lg text-white p-2 -mt-6">
              {_.filter(doitac, (e) => !e.pheduyet)?.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
