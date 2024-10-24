import React from "react";
import { Statistic, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import Carousel from "react-multi-carousel";
import { responsiveProductHome } from "../../Home/ResponsiveCarousel";

export default function ProductHeader({ size }) {
  const { sp, bcspvp } = useSelector((state) => state.AdminReducer);
  return (
    <div className="w-full container flex flex-row justify-center gap-6 pt-5">
      {size?.width >= 1280 ? (
        <>
          <div className="w-1/5">
            <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
              <Statistic
                title="Tổng sản phẩm"
                value={sp?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/5">
            <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
              <Statistic
                title="Đang hoạt động"
                value={_.filter(sp, (e) => e.trangthai)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/5">
            <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
              <Statistic
                title="Ngừng hoạt động"
                value={_.filter(sp, (e) => !e.trangthai)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/5">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Statistic
                title="Sản phẩm vi phạm"
                value={_?.filter(sp, (e) => e.spvp)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/5">
            <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
              <Statistic
                title="Báo cáo sản phẩm"
                value={bcspvp?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
        </>
      ) : (
        <div className="w-full">
          <Carousel responsive={responsiveProductHome}>
          <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
              <Statistic
                title="Tổng sản phẩm"
                value={sp?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
              <Statistic
                title="Đang hoạt động"
                value={_.filter(sp, (e) => e.trangthai)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
              <Statistic
                title="Ngừng hoạt động"
                value={_.filter(sp, (e) => !e.trangthai)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Statistic
                title="Sản phẩm vi phạm"
                value={_?.filter(sp, (e) => e.spvp)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
              <Statistic
                title="Báo cáo sản phẩm"
                value={bcspvp?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Carousel>
        </div>
      )}
    </div>
  );
}
