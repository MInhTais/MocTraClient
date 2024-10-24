import _ from 'lodash';
import React from 'react'

export default function FlexDemo() {
    //flexbox.org
    //Hàng ngang: không điền hoặc flex-row
    //Hàng dọc: flex-col
    //DÙng start, end, center
    //Set item giữa style={{alignItem:'center'}} hoặc items-center

    const a= 'w-1/3 h-10 bg-black';
    const b= 'w-1/3 h-10 bg-yellow-400';
    const c ='w-1/3 h-10 bg-pink-400';
    const css =[
        {
            cssa:'w-1/3 h-10 bg-black'
        },
        {
            cssb: 'w-1/3 h-10 bg-yellow-400'
        },
        {
            cssc: 'w-1/3 h-10 bg-pink-400'
        }
    ]
    const array =[
        {id:1},
        {id:2},
        {id:3},
        {id:4}
    ]

    const render = ()=>{
        return _.map(array,(item,i)=>{
            return (
                <div className="w-1/3">{item.id}</div>
            )
        })
    }
    return (
            <div className="flex flex-row flex-wrap gap-4">
                {render()}
            </div>
    )
}
