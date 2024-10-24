import React from 'react'
import _ from 'lodash';
export default function LastFirstDemo() {
    const arrStudent =[
        {id:1,name:'Long'},
        {id:2,name:'Taji'},
        {id:3,name:'Quyen'}
    ]
    //
    const firstItem = _.first(arrStudent);
    const lastItem = _.last(arrStudent);

    const arr =[['001','Long'], ['002','Taij'],['003','Quyen']];
    const [id,name] =_.first(arr);
    const [id2,name2] = _.last(arr);

    return (
        <div className="container">
            <div>First Item: {firstItem.name}</div>
            <div>Last Item: {lastItem.name}</div><hr />
            <div>First Item: {id} - {name}</div>
            <div>Last Item: {id2} - {name2}</div>
        </div>
    )
}
