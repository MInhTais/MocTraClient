import React from 'react'
import _ from 'lodash';
export default function ChunkDemo() {

    const arr = ['id',1,'name','Long','info','kalakla'];
    const result = _.chunk(arr,2);
    const arrString = ["a,1","a2","a3","a4","a5","a6","a7","a8","a9","a10"];
    const result2 = _.chunk(arrString,2);
    console.log(result2);
    return (
        <div>
            {result}
        </div>
    )
}
