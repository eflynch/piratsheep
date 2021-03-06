import React from 'react';

const Grid = ({data, cursor, ...props}) => {
    return (
        <div className="grid" {...props}>
            {data.map((row, y)=>{
            return (
                <div className="row" key={y}>
                    {row.map((d, x) => {
                        return (
                            <div className={"cell" + (cursor.x == x && cursor.y == y ? " cursor" : "")} key={x}>
                                {d}
                            </div>
                        );
                    })}
                </div>
            )
        })}
        </div>
    );  
};

export default Grid;
