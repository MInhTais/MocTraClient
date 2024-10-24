export const columns = [
    {
        title: "Mã ĐH",
        key:"madh",
        dataIndex:"madh"
    },
    {
        title:"Họ tên",
        key:"hoten",
        render:(text,record,index)=>{
            return (
                 <div>{record.hoten}</div>
            )
        }
    },
    {
        title: "Ngày lập",
        key:"ngaylap",
        dataIndex:"ngaylap"
    },
    {
        title:"Tổng tiền",
        key:'tongtien',
        dataIndex:'tongtien'
    }
]