import React from "react";
import { Table, Tabs } from "antd";
import { columns } from "../Column/RevenueColumns";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SET_TABS_KEY_STATISTICAL } from "../../../Common/Const/Admin/AdminConst";
import _ from "lodash";
import { MANAGER, SELLER } from "../../../Common/Const/Auth/AuthConst";
import ExportCSV from "../../../libs/Excel/ExportCSV";
import { NAME_EXCEL_REVENUE } from "../../../libs/Excel/Data";

const { TabPane } = Tabs;
export default function RevenueComponent(props) {
  const dispatch = useDispatch();
  const handleChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };
  const { credentials } = useSelector((state) => state.AuthReducer);
  const { dtbh, mtdtbh, admin, seller, size } = props;
  return (
    <>
      {admin && _.find(credentials?.roles, (e) => e === MANAGER) ? (
        <Tabs
          defaultActiveKey="1"
          centered
          onTabClick={(e) => {
            dispatch({
              type: SET_TABS_KEY_STATISTICAL,
              key: e,
            });
          }}
        >
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Tổng doanh thu bán hàng
              </span>
            }
            key="1"
          >
            <div className="md:container">
              <div className="p-5">
                <ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={dtbh} />
              </div>
              <Table
                columns={columns}
                rowKey={(record) => record.thang}
                expandable={{
                  expandedRowRender: (record) => (
                    <div className="flex flex-col">
                      <p className="mb-3 block">Đã bán: {record.tongslspban}</p>
                      <p className="mb-3 block">
                        Đơn hàng: {record.tongdonhang}
                      </p>
                    </div>
                  ),
                  rowExpandable: (record) => {
                    return size?.width >= 768 ? false : true;
                  },
                }}
                dataSource={dtbh}
                onChange={handleChange}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Doanh thu Mộc Trà
              </span>
            }
            key="2"
          >
            <div>
            <div className="p-5">
                <ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={mtdtbh} />
              </div>
              <Table
                columns={columns}
                rowKey={(record) => record.thang}
                expandable={{
                  expandedRowRender: (record) => (
                    <div className="flex flex-col">
                      <p className="mb-3 block">Đã bán: {record.tongslspban}</p>
                      <p className="mb-3 block">
                        Đơn hàng: {record.tongdonhang}
                      </p>
                    </div>
                  ),
                  rowExpandable: (record) => {
                    return size?.width >= 768 ? false : true;
                  },
                }}
                dataSource={mtdtbh}
                onChange={handleChange}
              />
            </div>
          </TabPane>
        </Tabs>
      ) : seller && _.find(credentials?.roles, (e) => e === SELLER) ? (
        
        <>
        <div className="p-5"><ExportCSV fileName={NAME_EXCEL_REVENUE} csvData={dtbh} /></div>
        <Table
          columns={columns}
          rowKey={(record) => record.thang}
          expandable={{
            expandedRowRender: (record) => (
              <div className="flex flex-col">
                <p className="mb-3 block">Đã bán: {record.tongslspban}</p>
                <p className="mb-3 block">Đơn hàng: {record.tongdonhang}</p>
              </div>
            ),
            rowExpandable: (record) => {
              return size?.width >= 768 ? false : true;
            },
          }}
          dataSource={dtbh}
          onChange={handleChange}
        /></>
      ) : null}
    </>
  );
}
