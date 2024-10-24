import React from "react";
import {  Column, Waterfall } from "@ant-design/charts";
import { useSelector } from "react-redux";
import _ from "lodash";
export default function Chart(props) {
  const {
    dtbh,
    cp,
    dt,
    sp,
    spt,
    mtdtbh,
    mtcp,
    mtdt,
    mtsp,
    bddt,
    mtbddt,
    bdsp,
    dtbdsp
  } = useSelector((state) => state.StatisticalReducer);
  const { adminURL } = useSelector((state) => state.BreadcrumbReducer);
  const { tabsKey, tabsKeyChartProduct } = useSelector((state)=>state.StatisticalReducer);

  var configH = {
    data: _.isEqual(adminURL, "Thống kê sản phẩm") && tabsKeyChartProduct == 1 ? bdsp : dtbdsp,
    padding: 'auto',
    appendPadding: [20, 0, 0, 0],
    xField: 'mancc',
    yField: 'tongsl',
    meta: {
      month: { alias: '月份' },
      value: {
        alias: '销售量',
        formatter: function formatter(v) {
          return ''.concat(v / 10000000, ' 亿');
        },
      },
    },
    total: {
      label: 'Tổng cộng',
      style: { fill: '#96a6a6' },
    },
    labelMode: 'absolute',
    label: {
      style: { fontSize: 10 },
      background: {
        style: {
          fill: '#f6f6f6',
          radius: 1,
        },
        padding: 1.5,
      },
    },
  };
  var config = {
    data: _.isEqual(adminURL, "Doanh thu") && tabsKey == 1 ? bddt : mtbddt,
    xField: "month",
    yField: "revenue",
    seriesField: "name",
    isGroup: "true",
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return (
    <div className="h-full w-full flex flex-col container mt-5">
      {_.isEqual(adminURL, "Doanh thu") ? (
        <>
          <div className="w-full flex flex-row justify-center">
            <h1 className="text-green-400 font-bold">
              BIỂU ĐỒ THỐNG KÊ DOANH THU THEO THÁNG
            </h1>
          </div>
          <div className="h-52 container">
            <Column {...config} />
          </div>
        </>
      ) : _.isEqual(adminURL, "Thống kê sản phẩm") ? (
        <>
          <div className="w-full flex flex-row justify-center">
            <h1 className="text-green-400 font-bold">
              BIỂU ĐỒ THỐNG KÊ SẢN PHẨM
            </h1>
          </div>
          <div className="h-52 container">
            <Waterfall {...configH} />
          </div>
        </>
      ) : null}
    </div>
  );
}
