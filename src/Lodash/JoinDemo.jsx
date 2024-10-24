import React from 'react'
import _ from 'lodash';
export default function JoinDemo() {
    let arr =['Long','Tại','Quyên'];
    let arrPerson = [
        {id:1,name:'Long'},
        {id:2,name:'Tại'},
        {id:3,name:'Quyên'}
    ]
    //es6
    const resultES6  = arr.join('-');
    const resultLodash = _.join(arr,'*');
    const findLodash = _.find(arrPerson,item=> item.id===1);
    return (
        <div>
            {resultES6}
            <br />
            {resultLodash}
            <br />
            <div>
                <p>Name: {findLodash.name}</p>
            </div>
        </div>
    )
}
