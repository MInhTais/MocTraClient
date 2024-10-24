import React from "react";
import { Table, Tabs } from "antd";
import { columns } from "../Column/TotalRevenueColumn";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import _ from "lodash";
import { NAME_EXCEL_REVENUE } from "../../../libs/Excel/Data";
import ExportCSV from "../../../libs/Excel/ExportCSV";

const { TabPane } = Tabs;
export default function TotalRevenueComponent(props) {
  const handleChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };
  const { dt, mtdt, admin, seller, size } = props;
  return (
    <>
      {admin ? (
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Tổng lợi nhuận
              </span>
            }
            key="1"
          >
            <div className="w-full md:container">
              <div className="p-5">
                <ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={dt} />
              </div>
              <Table
                columns={columns}
                rowKey={(record) => record.thang}
                expandable={{
                  expandedRowRender: (record) => (
                    <div className="flex flex-col">
                      <p className="mb-3 block">Tháng: {record.thang}</p>
                      <p className="mb-3 block">
                        Bán hàng: {record?.dtbh?.toLocaleString()}
                      </p>
                      <p className="mb-3 block">
                        Chi phí: {record?.chiphi?.toLocaleString()}
                      </p>
                    </div>
                  ),
                  rowExpandable: (record) => {
                    return size?.width >= 1080 ? false : true;
                  },
                }}
                dataSource={dt}
                onChange={handleChange}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Tổng lợi nhuận Mộc Trà
              </span>
            }
            key="2"
          >
            <div className="w-full">
              <div className="p-5">
                <ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={mtdt} />
              </div>
              <Table
                columns={columns}
                rowKey={(record) => record.thang}
                expandable={{
                  expandedRowRender: (record) => (
                    <div className="flex flex-col">
                      <p className="mb-3 block">Tháng: {record.thang}</p>
                      <p className="mb-3 block">
                        Bán hàng: {record?.dtbh?.toLocaleString()}
                      </p>
                      <p className="mb-3 block">
                        Chi phí: {record?.chiphi?.toLocaleString()}
                      </p>
                    </div>
                  ),
                }}
                dataSource={mtdt}
                onChange={handleChange}
              />
            </div>
          </TabPane>
        </Tabs>
      ) : seller ? (
        <>
          <div className="p-5">
            <ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={dt} />
          </div>
          <Table
            columns={columns}
            rowKey={(record) => record.thang}
            expandable={{
              expandedRowRender: (record) => (
                <div className="flex flex-col">
                  <p className="mb-3 block">Tháng: {record.thang}</p>
                  <p className="mb-3 block">
                    Bán hàng: {record?.dtbh?.toLocaleString()}
                  </p>
                  <p className="mb-3 block">
                    Chi phí: {record?.chiphi?.toLocaleString()}
                  </p>
                </div>
              ),
            }}
            dataSource={dt}
            onChange={handleChange}
          />
        </>
      ) : null}
    </>
  );
}
