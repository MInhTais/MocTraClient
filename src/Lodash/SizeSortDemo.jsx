import _ from 'lodash'
import React from 'react'

export default function SizeSortDemo() {
    const arr = [
        {id:1,name:'iphone', price:1000},
        {id:2,name:'iphone2', price:2000},
        {id:3,name:'iphone3', price:3000}
    ]

    console.log('arr size', _.size(arr));

    const object ={
        id:1,
        name:'iphone',
        price:1000
    }

    console.log('object size', _.size(object));

    var users =[
        {id:1,name:'Long', age:21},
        {id:2,name:'Tại', age:19},
        {id:3,name:'Quyên', age:19},
        {id:4,name:'Hậu', age:19},
        {id:5,name:'Quyên', age:25},
        {id:6,name:'Hậu', age:22}
    ]

    const resultSortByAge = _.sortBy(users,[item=>item.age]);
    console.log('result sort by age', resultSortByAge);
    //Sort theo tên và tuổi, nếu tên trùng sẽ sort theo tuổi
    const result = _.sortBy(users,['name','age']);
    console.log('sort two', result)
    return (
        <div>
            Size - Sort
        </div>
    )
}
