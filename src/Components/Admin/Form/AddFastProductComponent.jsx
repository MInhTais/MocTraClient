import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  dataExcel,
  instruct,
  NAME_EXCEL_PRODUCT,
} from "../../../libs/Excel/Data";
import ExportCSV from "../../../libs/Excel/ExportCSV";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LIST_PRODUCT_ACTION } from "../../../Common/Action/Admin/AdminAction";
import moment from "moment";
import { Tabs, Tag } from "antd";
import { BulbOutlined, CommentOutlined } from "@ant-design/icons";
import { GET_REFERENCES_PRODUCT_ACTION } from "../../../Common/Action/Admin/SellerAction";
import { Collapse } from "antd";

const { Panel } = Collapse;
const { TabPane } = Tabs;
const colors =[
  "#EE7942",
  "#6495ED",
  "#8B7355",
  "#54FF9F",
  "#CAFF70",
  "#FA8072",
  "#8B0A50",
  "#8B636C",
  "#EE7600",
  "#8B636C",
  "#8B008B",
  "#8B4789"
]
export default function AddFastProductComponent(props) {
  const [visible, setVisible] = useState(false);
  const { references } = useSelector((state) => state.SellerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_REFERENCES_PRODUCT_ACTION,
    });
  }, []);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
          cellDates: "true",
        });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      _.map(d, (e) => {
        e.ngayhethan = moment(e.ngayhethan)?._d;
      });
      dispatch({
        type: ADD_LIST_PRODUCT_ACTION,
        products: d,
      });
    });
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div>
        <h4>Vui lòng tải tài liệu dưới đây</h4>
      </div>
      <div className="w-full flex flex-row justify-start gap-6">
        <ExportCSV fileName={NAME_EXCEL_PRODUCT} csvData={dataExcel} />
        {!visible ? (
          <button
            className="button-3d-green"
            onClick={() => {
              setVisible(true);
            }}
          >
            Hướng dẫn sử dụng
          </button>
        ) : (
          <button
            className="button-3d-green"
            onClick={() => {
              setVisible(false);
            }}
          >
            Đã hiểu
          </button>
        )}
      </div>
      <div className="mt-5">
        <div className="w-full flex flex-row justify-center h-96 overflow-auto gap-4">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <label className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  GỬI FILE
                </label>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Chức năng này có thể giúp bạn thêm nhanh số lượng sản phẩm.
                </p>
                <input
                  type="file"
                  id="excel"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                  }}
                />
                <label className="button-3d-red cursor-pointer" htmlFor="excel">
                  Thêm
                </label>
              </div>
              {visible ? (
                <>
                  <Tabs defaultActiveKey="2">
                    <TabPane
                      tab={
                        <span>
                          <BulbOutlined />
                          Hướng Dẫn
                        </span>
                      }
                      key="1"
                    >
                      <div className="flex flex-wrap -m-4">
                        {_?.map(instruct, (e, i) => {
                          return (
                            <div className="w-full p-4" key={i}>
                              <div className="flex relative">
                                <img
                                  alt="gallery"
                                  className="absolute inset-0 w-full h-full object-cover object-center"
                                  src={e.image}
                                />
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                    {e.title}
                                  </h2>
                                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                    {e.subject}
                                  </h1>
                                  <p className="leading-relaxed">{e.content}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <CommentOutlined />
                          Lưu ý
                        </span>
                      }
                      key="2"
                    >
                      <div className="w-full flex flex-col justify-center">
                        <div className="flex flex-row justify-center">
                          <h4>
                            VUI LÒNG THÊM VỚI LOẠI VÀ THƯƠNG HIỆU DƯỚI ĐÂY
                          </h4>
                        </div>
                        <div className="flex flex-col justify-center">
                          <Collapse accordion>
                            {_?.map(references, (r, i) => {
                              return (
                                <>
                                  <Panel
                                    header={r.tenloai}
                                    key={i}
                                  >
                                    {_?.map(r?.thuonghieu,(th,index)=>{
                                      return(
                                        <Tag key={index} color={colors[index]}>{th.tenth}</Tag>
                                      )
                                    })}
                                  </Panel>
                                </>
                              );
                            })}
                          </Collapse>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
