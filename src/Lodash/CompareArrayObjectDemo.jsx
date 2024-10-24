import React from 'react'
import _ from 'lodash';
export default function CompareArrayObjectDemo() {
    //So sánh dựa trên vùng nhớ, địa chỉ nên giá trị luôn = false
    const result = [1,2] === [1,2];
    console.log("RESULT", result);
    const arrA = [1,2];
    const arrB = [1,2];
    console.log("RESULT EQUALS", _.isEqual(arrA.sort(),arrB.sort()));

    return (
        <div>
            Compare Array Object
        </div>
    )
}
