import _ from 'lodash';
import React from 'react'

export default function UniqDemo() {
    //Mảng kiểu dữ liệu nguyên thủy
    const arr =[1,2,3,2,1,5,4,3];
    //Mảng object
    const arr2 = [
        {id:'1',name:'Long',price:999},
        {id:'2',name:'Tại',price:899},
        {id:'1',name:'Long',price:999},
        {id:'2',name:'Tại',price:899},
        {id:'3',name:'Hậu',price:299}
    ]
    console.log(_.uniq(arr));
    //Lọc theo id
    console.log('UNIQ', _.uniqBy(arr2,'id'));
    return (
        <div>
            Unique
        </div>
    )
}
