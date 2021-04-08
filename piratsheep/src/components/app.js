import React, {useEffect, useReducer, useState, useMemo} from 'react';
import update from 'immutability-helper';

import useKeybinding from '../useKeybinding';

const serialize = data => data.map(row=>row.join("")).join("\n");
const deserialize = data => data.split("\n").map(row=>row.split(""));

const reducer = (action, state) => {
    switch (action.type) {
        case "step":
            return step(state);
        case "write":
            return update(state, {
                [action.x]: {[action.y] : {$set: action.v}}
            });
    }
    return state;
};

const Grid = ({data, cursor, ...props}) => {
    return (
        <div className="grid" {...props}>
            {data.map((row, y_rev)=>{
            const y = data.length - y_rev - 1;
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

const App = ({}) => {
    const initialState = deserialize('hello\nworld');
    const [data, dispatch] = useReducer(reducer, initialState);
    const [cursor, setCursor] = useState({x: 0, y: 0});

    useKeybinding("ArrowLeft", "", (keys)=>{
        setCursor({x: Math.max(0, cursor.x - 1), y: cursor.y });
    }, {allowRepeat:true});

    useKeybinding("ArrowRight", "", (keys)=>{
        setCursor({x: Math.min(cursor.x + 1, data[0].length-1), y: cursor.y });
    }, {allowRepeat:true});

    useKeybinding("ArrowUp", "", (keys)=>{
        setCursor({y: Math.min(cursor.y + 1, data.length-1), x: cursor.x });
    }, {allowRepeat:true});

    useKeybinding("ArrowDown", "", (keys)=>{
        setCursor({y: Math.max(0, cursor.y - 1), x: cursor.x });
    }, {allowRepeat:true});

    return (
        <Grid data={data} cursor={cursor} style={{height:"80%", width:"80%"}}/>
    );
};

export default App;

