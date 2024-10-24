import React from "react";
import { Statistic, Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import { responsiveProductHome } from "../../Home/ResponsiveCarousel";
import Carousel from "react-multi-carousel";

export default function OrderHeader({ size }) {
  const { detail, order, returngoods } = useSelector(
    (state) => state.OrderReducer
  );
  return (
    <div className="w-full container flex flex-row justify-center gap-6 pt-5">
      {size?.width >= 1280 ? (
        <>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-gray-500 to-gray-200 rounded-lg">
              <Statistic
                title="Tổng đơn hàng"
                value={order?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
              <Statistic
                title="Chưa xử lý"
                value={_.filter(order, (e) => !e.trangthai)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
              <Statistic
                title="Đã xử lý"
                value={_.filter(detail, (e) => e.pheduyet)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
              <Statistic
                title="Chưa xử lý"
                value={_.filter(detail, (e) => !e.pheduyet)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Statistic
                title="Tổng yêu cầu"
                value={returngoods?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </div>
          <div className="w-1/6">
            <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
              <Statistic
                title="Yêu cầu chưa xử lý"
                value={_.filter(returngoods, (e) => !e.pheduyet)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </div>
        </>
      ) : (
        <div className="w-full">
          <Carousel responsive={responsiveProductHome}>
            <Card className="bg-gradient-to-r from-gray-500 to-gray-200 rounded-lg">
              <Statistic
                title="Tổng đơn hàng"
                value={order?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
              <Statistic
                title="Chưa xử lý"
                value={_.filter(order, (e) => !e.trangthai)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
              <Statistic
                title="Đã xử lý"
                value={_.filter(detail, (e) => e.pheduyet)?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
              <Statistic
                title="Chưa xử lý"
                value={_.filter(detail, (e) => !e.pheduyet)?.length}
                valueStyle={{ color: "black" }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Statistic
                title="Tổng yêu cầu"
                value={returngoods?.length}
                valueStyle={{ color: "white" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
            <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
              <Statistic
                title="Yêu cầu chưa xử lý"
                value={_.filter(returngoods, (e) => !e.pheduyet)?.length}
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
