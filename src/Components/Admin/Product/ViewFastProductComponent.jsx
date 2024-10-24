import React from 'react'

export default function ViewFastProductComponent(props) {
    const {record} = props;
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex flex-row w-full gap-2">
                <label className="font-bold">Vi phạm: </label>
                <label>{record?.sp?.spvp ? record?.sp?.spvp?.lydo : 'Chưa có'}</label>
            </div>
        </div>
    )
}
