import React, { useState } from "react";
import { Badge, Select, Table, Tabs, Tag } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CHART_PRODUCT_BY_MONTH_ACTION } from "../../../Common/Action/Admin/AdminAction";
import {  SET_TABS_KEY_CHART_PRODUCT } from "../../../Common/Const/Admin/AdminConst";
import { SELLER } from "../../../Common/Const/Auth/AuthConst";
import _ from "lodash";
import { NAME_EXCEL_PRODUCT_STATISTIC } from "../../../libs/Excel/Data";
import ExportCSV from "../../../libs/Excel/ExportCSV";

const { TabPane } = Tabs;
const { Option } = Select;
export default function ProductComponent(props) {
  const { sp, mtsp,admin,seller } = props;
  const {credentials} = useSelector((state)=>state.AuthReducer);
  const dispatch = useDispatch();
  const Month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [state, setState] = useState({
    sorted: null,
  });
  const [month, setMonth] = useState(1);
  const renderMonth = () => {
    return Month.map((m, i) => {
      return (
        <Option key={i} value={m}>
          Tháng {m}
        </Option>
      );
    });
  };

  const handleChange = (pagination, filters, sorter) => {
    setState({
      sorted: sorter,
    });
  };
  let { sorted } = state;
  sorted = sorted || {};
  const columns = [
    {
      title: "Mã sản phẩm",
      key: "masp",
      sorter: (a, b) => a.masp.localeCompare(b.masp),
      sortOrder: sorted.columnKey === "masp" && sorted.order,
      render: (text, record, index) => {
        return <Badge color={"gold"} text={record?.masp} />;
      },
      ellipsis: true,
    },
    {
      title: "Nhà cung cấp",
      key: "nhacungcap",
      sorter: (a, b) => a.nhacungcap.localeCompare(b.nhacungcap),
      sortOrder: sorted.columnKey === "nhacungcap" && sorted.order,
      render: (text, record, index) => {
        return <Badge color={"gold"} text={record?.nhacungcap} />;
      },
      ellipsis: true,
      responsive:['sm']
    },
    {
      title: "Chi phí",
      key: "chiphi",
      render: (text, record, index) => {
        return (
          <p>
            {record?.chiphi.toLocaleString()} <span>đ</span>
          </p>
        );
      },
      sorter: (a, b) => a.chiphi - b.chiphi,
      sortOrder: sorted.columnKey === "chiphi" && sorted.order,
      responsive: ["lg"],
    },
    {
      title: "Doanh thu",
      key: "doanhthubh",
      render: (text, record, index) => {
        return (
          <p>
            {record?.doanhthubh.toLocaleString()} <span>đ</span>
          </p>
        );
      },
      sorter: (a, b) => a.doanhthubh - b.doanhthubh,
      sortOrder: sorted.columnKey === "doanhthubh" && sorted.order,
      responsive: ["md"],
    },
    {
      title: "Tổng",
      key: "doanhthu",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row">
            <Tag color='green'>{record?.doanhthu.toLocaleString()+'đ'} </Tag>
          </div>
        );
      },
      sorter: (a, b) => a.doanhthu - b.doanhthu,
      sortOrder: sorted.columnKey === "doanhthu" && sorted.order,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <Tabs defaultActiveKey="1"
      onTabClick={(e)=>{
        dispatch({
          type: SET_TABS_KEY_CHART_PRODUCT,
          tabsKey:e
        })
      }}
      >
       {admin ?  <TabPane
          tab={
            <span>
              <AppleOutlined />
              Tổng Doanh Thu Cửa Hàng
            </span>
          }
          key="1"
        >
          <Select
            className="mb-4 fold:w-3/4 md:w-32"
            defaultValue={month}
            name="month"
            onChange={(e) => {
              setMonth(e);
              dispatch({
                type: CHART_PRODUCT_BY_MONTH_ACTION,
                month: e,
                note: "ALL"
              });
            }}
          >
            <Option value={0} key="all">Tất cả</Option>
            {renderMonth()}
          </Select>
          <div className="p-5">
            <ExportCSV fileName={NAME_EXCEL_PRODUCT_STATISTIC} csvData={month === 0 ? mtsp : mtsp.filter((e) => e.thang === month)} />
          </div>
          <Table
            scroll={{ y: 380 }}
            columns={columns}
            rowKey={(record) => record?.masp}
            expandable={{
              expandedRowRender: (record) => (
                <div className="flex flex-col">
                  <p className="mb-3 block">Lượt mua: {record?.luotmua}</p>
                  <p className="mb-3 block">Đã bán: {record?.tongslban}</p>
                  <p className="mb-3 block">Tồn: {record?.tongslton}</p>
                  <p className="mb-3 block lg:hidden">
                    Chi phí: <Tag color='red'>{record?.chiphi?.toLocaleString()+'đ'}</Tag>
                  </p>
                  <p className="mb-3 block md:hidden">Doanh thu: <Tag color="green">{record?.doanhthubh?.toLocaleString()+'đ'}</Tag></p>
                </div>
              ),
            }}
            dataSource={month === 0 ? mtsp : mtsp.filter((e) => e.thang === month)}
            onChange={handleChange}
          />
        </TabPane>: null}
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              {seller && _.find(credentials?.roles,e=>e===SELLER) ? 'Doanh Thu Tổng' :'Tổng Doanh Thu Đối Tác'}
            </span>
          }
          key="2"
        >
          <Select
            className="mb-4 fold:w-3/4 md:w-32"
            defaultValue={month}
            name="month"
            onChange={(e) => {
              setMonth(e);
              if(admin){
                dispatch({
                  type: CHART_PRODUCT_BY_MONTH_ACTION,
                  month: e,
                  note: "PARTNER"
                });
              }
            }}
          >
            <Option value={0} key={'all'}>Tất cả</Option>
            {renderMonth()}
          </Select>
          <div className="p-5">
            <ExportCSV fileName={NAME_EXCEL_PRODUCT_STATISTIC} csvData={month == 0 ? sp : sp.filter((e) => e.thang === month)} />
          </div>
          <Table
            scroll={{ y: 380 }}
            columns={columns}
            rowKey={(record) => record.masp}
            expandable={{
              expandedRowRender: (record) => (
                <div className="flex flex-col">
                  <p className="mb-3 block">Lượt mua: {record.luotmua}</p>
                  <p className="mb-3 block">Đã bán: {record.tongslban}</p>
                  <p className="mb-3 block">Tồn: {record.tongslton}</p>
                  <p className="mb-3 block">
                    Chi phí: {record?.chiphi?.toLocaleString()}
                  </p>
                </div>
              ),
            }}
            dataSource={month == 0 ? sp : sp.filter((e) => e.thang === month)}
            onChange={handleChange}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
