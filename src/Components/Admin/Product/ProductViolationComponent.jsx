import {
  AppleOutlined,
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  SyncOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Image, Popconfirm, Popover, Table, Tag, Tooltip, Badge } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER_RESTRICTED_ACTION, UPDATE_PRODUCT_VIOLATION_ACTION, UPDATE_USER_RESTRICTED_ACTION } from "../../../Common/Action/Admin/AdminAction";
import { notify } from "../../../libs/Notify/Notify";
import ViewFastUserComponent from "../User/ViewFastUserComponent";
import ViewFastProductComponent from "./ViewFastProductComponent";

export default function ProductViolationComponent(props) {
  const { sortedInfo, handleChange,size } = props;
  const { bcspvp } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  const columnViolations = [
    {
      title: "Mã báo cáo",
      dataIndex: "mavp",
      key: "mavp",
      width: "5%",
      fixed: "left",
      responsive:['xl']
    },
    {
      title: "Nội dung",
      key: "noidung",
      render: (text, record, index) => {
        return (
          <div className="w-full flex flex-row justify-start">
            <p className="text-xs">{record.noidung}</p>
          </div>
        );
      },
      fixed: "left",
      responsive:['xl']
    },
    {
      title: "Người báo cáo",
      key: "tk",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-start">
            <Popover
              placement={"bottom"}
              getPopupContainer={(node) => node.parentElement}
              content={
                <div className="h-64 overflow-auto">
                  <ViewFastUserComponent record={record} />
                </div>
              }
            >
              {record?.tk?.hoten?.length > 15
                ? record?.tk?.hoten?.slice(0, 14) + "..."
                : record?.tk?.hoten}
            </Popover>
          </div>
        );
      },
      responsive:['xl']
    },
    {
      title: "Hình ảnh",
      key: "hinhanh",
      render: (text, record, index) => {
        return (
          <Image.PreviewGroup>
            <Image
              width={70}
              height={50}
              src={"http://localhost:8080/images/product/" + record.sp.hinhanh}
            />
          </Image.PreviewGroup>
        );
      },
      width: 90,
    },
    {
      title: "Mã sản phẩm",
      key: "masp",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center">
            <Popover
              placement={"top"}
              getPopupContainer={(node) => node.parentElement}
              content={
                <div>
                  <ViewFastProductComponent record={record} />
                </div>
              }
            >
              <Tag icon={<AppleOutlined />} color="green">
                {record?.sp?.masp}
              </Tag>
            </Popover>
          </div>
        );
      },
      width: "auto",
      responsive:['sm']
    },
    {
      title: "Tên sản phẩm",
      key: "tensp",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center">
            <Tooltip title={record?.sp?.tensp}>
              {record?.sp?.tensp?.length > 30
                ? record.sp.tensp.slice(0, 29) + "..."
                : record.sp.tensp}
            </Tooltip>
          </div>
        );
      },
      ellipsis: true,
      sorter: (a, b) => a.sp.tensp.length - b.sp.tensp.length,
      sortOrder: sortedInfo.columnKey === "tensp" && sortedInfo.order,
      responsive: ["lg"],
    },
    {
      title: "Nhà cung cấp",
      key: "nhacungcap",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center">
            <Tooltip title={record?.sp?.nhacungcap?.tenncc}>
              {record?.sp?.nhacungcap?.tenncc?.length > 30
                ? record?.sp?.nhacungcap?.tenncc?.slice(0, 29) + "..."
                : record?.sp?.nhacungcap?.tenncc}
            </Tooltip>
          </div>
        );
      },
      responsive:['xl']
    },
    {
      title: "Cửa hàng",
      key: "cuahang",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center">
            <Tooltip title={record?.sp?.nhacungcap?.cuahang?.tencuahang}>
              {record?.sp?.nhacungcap?.cuahang
                ? record?.sp?.nhacungcap?.cuahang?.tencuahang?.length > 30
                  ? record?.sp?.nhacungcap?.cuahang?.tencuahang?.slice(0, 29) +
                    "..."
                  : record?.sp?.nhacungcap?.cuahang?.tencuahang
                : "Mộc Trà"}
            </Tooltip>
          </div>
        );
      },
      responsive:['xl']
    },
    {
      title: "Trạng thái",
      key:'trangthai',
      render:(text,record,index)=>{
        return (
          <div className="flex flex-row w-full justify-center">
            <Tag icon={record.pheduyet ?  <CheckCircleOutlined /> : <SyncOutlined spin />} color={record.pheduyet ? 'green' : 'red'} >{record.pheduyet ? 'Đã phê duyệt' : 'Chưa phê duyệt'}</Tag>
          </div>
        )
      },
      responsive:['xl']
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="flex flex-row w-full justify-center gap-2">
            {record.pheduyet ? null : <Popconfirm
              placement="top"
              title={
                "Bạn có muốn phê duyệt báo cáo này, điều này sẽ ảnh hưởng đến sản phẩm của người bán, bạn vẫn muốn tiếp tục?"
              }
              onConfirm={() => {
                record.pheduyet = !record?.pheduyet;
                dispatch({
                  type: UPDATE_PRODUCT_VIOLATION_ACTION,
                  mavp: record.mavp,
                  bcvp: record
                });
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title={"Phê duyệt báo cáo"}>
              <EyeInvisibleOutlined className="stick-icon" />
              </Tooltip>
            </Popconfirm>}
            
            <Popconfirm
              placement="top"
              title={
                !record?.tk?.tkhc ? 
                "Bạn có muốn thêm người dùng này vào danh sách hạn chế lượt đánh giá?":
                `Bạn đã thêm người dùng này vào danh sách hạn chế, nếu quá 5 lần người dùng này sẽ bị khóa tính năng đánh giá, hiện tại còn ${5- record?.tk?.tkhc?.baocao} lần, bạn vẫn muốn tiếp tục?`
              }
              onConfirm={() => {
                if(record?.tk?.tkhc?.baocao >=5){
                  notify('warning','Người này đã bị khóa chức năng đánh giá')
                }else{
                  let user ={
                    tendn: record?.tk?.tendn,
                    baocao:1,
                  }
                  dispatch({
                    type: record?.tk?.tkhc ? UPDATE_USER_RESTRICTED_ACTION : ADD_USER_RESTRICTED_ACTION,
                    user
                  });
                }
              }}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Tooltip title={"Thêm người dùng vào danh sách hạn chế"}>
              <UserDeleteOutlined className="stick-icon text-red-600" />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columnViolations}
        dataSource={bcspvp}
        scroll={{ x: size?.width >= 1280 ? 1500 : 0, y: 450 }}
        rowKey={(record) => record.mavp}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block sm:hidden">Mã SP: <Tag color='green'>{record?.sp?.masp}</Tag></p>
              <p className="mb-3 block">Tên SP: {record?.sp?.tensp}</p>
              <p className="mb-3 block">
                Thương hiệu: <Tag color='orange'>{record?.sp?.thuonghieu?.tenth}</Tag>
              </p>
              <p className="mb-3 block md:hidden">
                Đơn giá: {record?.sp?.dongia?.toLocaleString()}
              </p>
              <p className="mb-3 block">Loại: <Tag color='blue'>{record?.sp?.loaisp?.tenloai}</Tag></p>
              <p className="mb-3 block">Tổng SL: <Badge text={record?.sp?.tongsl} color='blue' /></p>
              <p className="mb-3 block md:hidden">Đã bán: <Badge color='green' text={record?.sp?.daban} /></p>
              <p className="mb-3 block">Còn lại: <Badge text={record?.sp?.conlai} color={'red'} /></p>
              <p className="mb-3 block">
                Trọng lượng: {record?.sp?.trongluong}{" "}
                {record?.sp?.trongluong ? " g" : null}
              </p>
            </div>
          ),
          rowExpandable: (record) => {
            return size?.width >= 1280 ? false : true;
          },
        }}
        onChange={handleChange}
        sticky
      />
    </div>
  );
}
