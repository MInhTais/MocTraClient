import React from 'react'

export default function PaddingMargin() {
    //1 đơn vị là 0.25 rem...
    //px: chiều ngang
    //py: chiều dọc

    //Padding
    //className = p-n/pt-n/pl-n/pb-n/pr-n/px-n/py-n
    // p là ký tự cho padding n là số từ 0 đến 96 đơn vị là (1 = 0.25 rem)
    
    //Margin
    // className: m-n/ml-n/mb-n/mr-n/mx-n/my-n
    //Với m là ký tự cho margin n là số từ 0 - 96 đơn vị là (1 = 0.25 25rem)
    return (
        <div className="container">
            <br />
            <button className="bg-red-400 px-5 py-5" style={{width: 'auto', margin:15}}>
                button padding
            </button>

            <button className="bg-purple-400 mx-5">
                Button Margin
            </button>
        </div>
    )
}
