import _ from 'lodash';
import React from 'react'

export default function IncludesDemo() {

    const arr =['1','2','3'];
    //So sánh giá trị và kiểu dữ liệu
    //Dùng để tìm trong object là chủ yếu
    console.log(_.includes(arr,'1','2'));
    console.log(_.includes(arr,'1'));
    const object ={id:1,name:'Long',age:21};
    console.log('Result: ',_.includes(object,1),_.includes(object,21),_.includes(object,'Long'),_.includes(object,'long'));
    console.log(_.includes('abcd', 'bc'));
    return (
        <div>
            Includes
        </div>
    )
}
