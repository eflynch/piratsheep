import {useEffect, useReducer, useCallback, useRef} from 'react';
import update from 'immutability-helper';

const useKeybinding = (goKeys, stopKeys, callback, options) => {
    const [state, dispatchState] = useReducer((state, action) => {
        switch (action.type) {
            case 'reset': {
                const goKeys = action.goKeys.split(",");
                const initialGoKeys = goKeys.filter(k=>k).reduce((currentKeys, key) => {
                    currentKeys[key.toLowerCase()] = false;
                    return currentKeys;
                }, {});
        
                const stopKeys = action.stopKeys.split(",");
                const initialStopKeys = stopKeys.filter(k=>k).reduce((currentKeys, key) => {
                    currentKeys[key.toLowerCase()] = true;
                    return currentKeys;
                }, {});
        
                return {
                    keys: {...initialGoKeys, ...initialStopKeys},
                    repeat: state.repeat
                };
            }
            case 'repeat':
                return update(state, {repeat: {$set: !state.repeat}});
            case 'up':
                return update(state, {keys: {[action.key]: {$set: false}}});
            case 'down':
                return update(state, {keys: {[action.key]: {$set: true}}});
        }
    }, {keys:{}, repeat: false});


    useEffect(()=>{
        dispatchState({type:"reset", goKeys, stopKeys});
    }, [goKeys, stopKeys]);

    const keydownListener = useCallback((k, go=true) => e => {
        const {key, repeat} = e;
        const kL = k.toLowerCase();
        if (repeat) {
            if(options === undefined || options.allowRepeat === undefined || !options.allowRepeat) {
                return;
            }
        }
        if (kL !== key.toLowerCase()) { return; }
        if (go) {
            if (repeat) {
                dispatchState({type: "repeat"});
            } else {
                dispatchState({type: "down", key: kL});
            }
        } else {
            dispatchState({type: "up", key: kL});
        }
        return false;
    }, [goKeys, stopKeys, options]);

    const keyupListener = useCallback((k, go=true) => e => {
        const {key} = e;
        const kL = k.toLowerCase();
        if (kL !== key.toLowerCase()) { return; }
        if (go) {
            dispatchState({type: "up", key: kL});
        } else {
            dispatchState({type: "down", key: kL});
        }
        
        return false;
    }, [goKeys, stopKeys]);

    useEffect(() => {
        if (!Object.values(state.keys).filter(value => !value).length) {
            callback(state.keys);
        }
    }, [state]);

    useEffect(() => {
        goKeys.split(",").forEach(k => window.addEventListener("keydown", keydownListener(k)));
        stopKeys.split(",").forEach(k => window.addEventListener("keydown", keydownListener(k, false)));
        return () => {
            goKeys.split(",").forEach(k => window.removeEventListener("keydown", keydownListener(k)));
            stopKeys.split(",").forEach(k => window.removeEventListener("keydown", keydownListener(k, false)));
        };
    }, [goKeys, stopKeys]);

    useEffect(() => {
        goKeys.split(",").forEach(k => window.addEventListener("keyup", keyupListener(k)));
        stopKeys.split(",").forEach(k => window.addEventListener("keyup", keyupListener(k, false)));
        return () => {
            goKeys.split(",").forEach(k => window.removeEventListener("keyup", keyupListener(k)));
            stopKeys.split(",").forEach(k => window.removeEventListener("keyup", keyupListener(k, false)));
        };
    }, [goKeys, stopKeys]);
};


export default useKeybinding;
