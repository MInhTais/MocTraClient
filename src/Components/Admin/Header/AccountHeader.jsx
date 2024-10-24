import React from "react";
import { Statistic, Card } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import Carousel from "react-multi-carousel";
import { responsiveProductHome } from "../../Home/ResponsiveCarousel";

export default function AccountHeader({size}) {
  const { authorities } = useSelector((state) => state.AuthorityReducer);
  return (
    <div className="w-full container flex flex-row justify-center gap-6 pt-5">
      {size?.width >=1280 ? <><div className="w-1/5">
        <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
          <Statistic
            title="Tổng vai trò"
            value={authorities?.roles?.length}
            valueStyle={{ color: "white" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </div>
      <div className="w-1/5">
        <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
          <Statistic
            title="Tổng phân quyền"
            value={authorities?.authority?.length}
            valueStyle={{ color: "white" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </div>
      <div className="w-1/5">
        <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
          <Statistic
            title="Tổng tài khoản"
            value={authorities?.accounts?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </div>
      <div className="w-1/5">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
          <Statistic
            title="Tài khoản khóa"
            value={_.filter(!authorities?.accounts,e=>e.kichhoat)?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </div>
      <div className="w-1/5">
        <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
          <Statistic
            title="Tài khoản vi phạm"
            value={authorities?.blocks?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </div></> : 
      <div className="w-full">
      <Carousel responsive={responsiveProductHome}>
      <Card className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
          <Statistic
            title="Tổng vai trò"
            value={authorities?.roles?.length}
            valueStyle={{ color: "white" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
        <Card className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg">
          <Statistic
            title="Tổng phân quyền"
            value={authorities?.authority?.length}
            valueStyle={{ color: "white" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
        <Card className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-lg">
          <Statistic
            title="Tổng tài khoản"
            value={authorities?.accounts?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
          <Statistic
            title="Tài khoản khóa"
            value={_.filter(!authorities?.accounts,e=>e.kichhoat)?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
        <Card className="bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg">
          <Statistic
            title="Tài khoản vi phạm"
            value={authorities?.blocks?.length}
            valueStyle={{ color: "black" }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Carousel>
    </div>
      }
    </div>
  );
}
