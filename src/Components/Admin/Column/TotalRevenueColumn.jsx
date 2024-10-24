import {Badge} from 'antd';
const color= [
    'red',
    '#87d068',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'green'
]

export const columns =[
    {
        title: 'Tháng',
        key: 'thang',
        render:(text,record,index)=>{
            return <Badge color={color[index]} text={record.thang} />
        },
        sorter:(a,b)=>a.thang - b.thang
    },
    {
        title: 'Tổng doanh thu',
        key: 'dtbh',
        render: (text,record,index)=>{
            return <p>{record.dtbh.toLocaleString()} <span>đ</span></p>
        },
        sorter:(a,b)=>a.dtbh - b.dtbh,
        responsive:['xl']
    },
    {
        title: 'Tổng chi phí',
        key: 'chiphi',
        render: (text,record,index)=>{
            return <p>{record.chiphi.toLocaleString()} <span>đ</span></p>
        },
        sorter:(a,b)=>a.chiphi - b.chiphi,
        responsive:['xl']
    },
    {
        title: 'Còn lại',
        key: 'doanhthu',
        render: (text,record,index)=>{
            return <Badge color={record.doanhthu <0 ? color[0] :color[1]} text={record.doanhthu.toLocaleString()} />
            
        },
        sorter:(a,b)=>a.doanhthu - b.doanhthu
    }
]