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
export const columns= [
    {
        title: 'Tháng',
        key: 'thang',
        render: (text,record,index)=>{
            return <Badge color={color[record.thang]} text={record.thang} />
            
        },
        sorter:(a,b)=> a.thang -b.thang 
    },
    {
        title: 'Tổng sản phẩm',
        key: 'tongsp',
        dataIndex: 'tongsp',
        sorter:(a,b)=>a.tongsp-b.tongsp,
        responsive:['xl']
    },
    {
        title: 'Tổng số lượng',
        key: 'tongslnhap',
        dataIndex: 'tongslnhap',
        sorter:(a,b)=>a.tongslnhap - b.tongslnhap,
        responsive:['xl']
    },
    {
        title: 'Tổng chi phí',
        key: 'tongtien',
        render: (text,record,index)=>{
            return <Badge color={color[0]} text={record.tongtien.toLocaleString()} />
            
        },
        sorter:(a,b)=>a.tongtien - b.tongtien
    },
    {
        title: 'Số nhà cung cấp',
        key: 'tongncc',
        dataIndex: 'tongncc',
        sorter:(a,b)=>a.tongncc - b.tongncc,
        responsive:['xl']
    }
]