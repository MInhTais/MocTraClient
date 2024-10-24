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
        render: (text,record,index)=>{
            console.log(record.thang)
            return <Badge color={color[record.thang]} text={record.thang} />
            
        },
        sorter:(a,b)=>a.thang-b.thang,
        responsive:['sm']
    },
    {
        title: 'Số lượng bán',
        key: 'tongslspban',
        dataIndex:'tongslspban',
        sorter:(a,b)=>a.tongslspban-b.tongslspban,
        responsive:['sm'],
    },
    {
        title: 'Tổng đơn hàng',
        key: 'tongdonhang',
        dataIndex:'tongdonhang',
        sorter:(a,b)=>a.tongdonhang-b.tongdonhang,
        responsive:['sm']
    },
    {
        title: 'Doanh thu bán hàng',
        key: 'tongdoanhthu',
        render: (text,record,index)=>{
            return <Badge color={color[1]} text={record.tongdoanhthu?.toLocaleString()} />
            
        },
        sorter:(a,b)=>a.tongdoanhthu-b.tongdoanhthu,
        
    }
]