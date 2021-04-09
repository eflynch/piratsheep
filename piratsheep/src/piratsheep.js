import update from 'immutability-helper';

export const serialize = data => data.map(row=>row.map(c=>c =="" ? " " : c).join("")).join("\n");
export const deserialize = data => data.split("\n").map(row=>row.split("").map(c=>c==" " ? "" : c));
export const create = (w, h) => Array(h).fill(Array(w).fill(""));

export const step = (state) => {
    return state.map(row=>row.map(cell=>cell === "" ? "x" : ""));
};

export const reducer = (state, action) => {
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
