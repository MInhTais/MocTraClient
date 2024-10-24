import React from 'react'

export const GridDemo=()=> {
    return (
        <div className="container">
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-red-400">1</div>
                <div className="bg-green-400">2</div>
                <div className="bg-gray-400">3</div>
                <div className="bg-yellow-400">3</div>
            </div>
        </div>
    )
}

