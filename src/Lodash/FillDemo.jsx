import React from 'react'
import _ from 'lodash';
export default function FillDemo() {
    //Giống splice
    let arr = [
        {id:1,name:'Long'},
        {id:2,name:'Tại'},
        {id:3,name:'Quyên'},
        {id:4,name:'Hậu'}
    ]

    //fill(array,param,start,end-1) chèn phần tử vào vị trí start - end -1
    //fill(array,param): ghi đè phần tử param vào tất cả các phần tử trong mảng.

    // _.fill(arr,{id:4,name:'Ngọc'},1,2);
    _.fill(arr,{id:5,name:'Nhi'},1,4);
    console.log(arr);

    return (
        <div>
            Fill
        </div>
    )
}


