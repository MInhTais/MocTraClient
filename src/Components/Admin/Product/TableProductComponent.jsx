import React from "react";
import {Table} from 'antd';
export default function TableProductComponent({columns,sp,handleChange,size}) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={sp}
        scroll={{ x: window.innerWidth >= 982 ? 1500 : 0, y: 450 }}
        rowKey={(record) => record.masp}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex flex-col">
              <p className="mb-3 block">{record.tensp}</p>
              <p className="mb-3 block">
                Thương hiệu: {record.thuonghieu.tenth}
              </p>
              <p className="mb-3 block md:hidden">
                Đơn giá: {record?.dongia?.toLocaleString()}
              </p>
              <p className="mb-3 block">Loại: {record?.loaisp?.tenloai}</p>
              <p className="mb-3 block">Tổng SL: {record.tongsl}</p>
              <p className="mb-3 block md:hidden">Đã bán: {record?.daban}</p>
              <p className="mb-3 block">Còn lại: {record?.conlai}</p>
              <p className="mb-3 block">
                Trọng lượng: {record?.trongluong}{" "}
                {record?.trongluong ? " g" : null}
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
    </>
  );
}
