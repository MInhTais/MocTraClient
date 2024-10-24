import _ from 'lodash';
import React from 'react'

export default function FlattenDemo() {
    const arr =[[1,[2,[3,[4]],5]]];
    //Giải nén 1 cấp
    const resultFlatten = _.flatten(arr);
    //Giải nén nhiều cấp
    const resultFlattenDeep = _.flattenDeep(arr);
    console.log("RESULT", resultFlatten);
    console.log("RESULT DEEP", resultFlattenDeep)
    return (
        <div>
            Flatten
        </div>
    )
}
