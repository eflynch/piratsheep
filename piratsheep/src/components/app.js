import React, {useEffect, useReducer, useState, useRef} from 'react';

import {deserialize, reducer, create} from '../piratsheep';
import useKeybinding from '../useKeybinding';
import Grid from './grid';

const initialState = create(20,20);

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
 };

const App = ({}) => {
    const [data, dispatch] = useReducer(reducer, initialState);
    const [cursor, setCursor] = useState({x: 0, y: 0});
    const [paused, setPaused] = useState(false);

    useInterval(()=>{
        if (!paused){
            dispatch({type:"step"}); 
        }
    }, 100);

    useKeybinding(" ", "", (keys)=> {
        setPaused(!paused);
    });

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
        <Grid data={data} cursor={cursor} />
    );
};

export default App;

