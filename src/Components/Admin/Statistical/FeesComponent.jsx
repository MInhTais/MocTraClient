import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Table, Tabs } from "antd";
import _ from "lodash";
import React from "react";
import { columns } from "../Column/FeesColumns";

const { TabPane } = Tabs;
export default function FeesComponent(props) {
  const handleChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  const {cp,mtcp,admin,seller,size} = props;
  return (
    <>
      {admin ? <Tabs defaultActiveKey="1" centered>
      <TabPane
        tab={
          <span>
            <AppleOutlined />
            Tổng chi phí bán hàng
          </span>
        }
        key="1"
      >
          <div className="w-full">
            <Table
              columns={columns}
              rowKey={(record) => record.thang}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex flex-col">
                    <p className="mb-3 block">Tháng: {record.thang}</p>
                    <p className="mb-3 block xl:hidden">
                      Tổng SP: {record.tongsp}
                    </p>
                    <p className="mb-3 block xl:hidden">
                      Tổng SL nhập: {record.tongslnhap}
                    </p>
                    <p className="mb-3 block xl:hidden">
                      Tổng NCC: {record.tongncc}
                    </p>
                  </div>
                ),
                rowExpandable: (record) => {
                  return size?.width >= 1200 ? false : true;
                },
              }}
              dataSource={cp}
              onChange={handleChange}
            />
          </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Tổng chi phí Mộc Trà
          </span>
        }
        key="2"
      >
        <div className="w-full">
            <Table
              columns={columns}
              rowKey={(record) => record.thang}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex flex-col">
                    <p className="mb-3 block">Tháng: {record.thang}</p>
                    <p className="mb-3 block duo:hidden">
                      Tổng SP: {record.tongsp}
                    </p>
                    <p className="mb-3 block duo:hidden">
                      Tổng SL nhập: {record.tongslnhap}
                    </p>
                    <p className="mb-3 block duo:hidden">
                      Tổng NCC: {record.tongncc}
                    </p>
                  </div>
                ),
                rowExpandable: (record) => {
                  return size?.width > 1200 ? false : true;
                },
              }}
              dataSource={mtcp}
              onChange={handleChange}
            />
          </div>
      </TabPane>
    </Tabs> : seller ? 
      <Table
      columns={columns}
      rowKey={(record) => record.thang}
      expandable={{
        expandedRowRender: (record) => (
          <div className="flex flex-col">
            <p className="mb-3 block">Tháng: {record.thang}</p>
            <p className="mb-3 block duo:hidden">
              Tổng SP: {record.tongsp}
            </p>
            <p className="mb-3 block duo:hidden">
              Tổng SL nhập: {record.tongslnhap}
            </p>
            <p className="mb-3 block duo:hidden">
              Tổng NCC: {record.tongncc}
            </p>
          </div>
        ),
        rowExpandable: (record) => {
          return size?.width>1200 ? false : true;
        },
      }}
      dataSource={cp}
      onChange={handleChange}
    />: null}
    </>
  );
}
