import React from 'react'
import {  ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import _ from 'lodash';
import { useSelector } from 'react-redux';

export default function CategoryHeader({size}) {
    const { nl} = useSelector((state) => state.AdminReducer);

    return (
        <div className="w-full container flex flex-row justify-center pt-5 fold:gap-2  md:gap-6">
        <div className="fold:w-full duo:w-1/2 lg:w-1/4">
          {size?.width >=1280 ? <Card 
          className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg">
            <Statistic
              title="Tổng nhóm loại"
              value={nl?.length}
              valueStyle={{ color: "white" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card> : <div className="bg-gradient-to-r from-green-300 to-green-400 rounded-lg h-24">
            <label className="text-xs p-2 text-white">Tổng nhóm loại</label>
            <p className="font-bold text-lg text-white p-2 -mt-6">{nl?.length}</p>
          </div>}
        </div>
      </div>
    )
}
