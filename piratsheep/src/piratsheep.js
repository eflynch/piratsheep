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
            return state.map((row, y)=>row.map((cell, x)=>{
                let neighbors = state.slice(y-1,y+2).map(row=>row.slice(x-1,x+2));
                const x_count = neighbors.flat().reduce((c,x)=>x ==="x" ? c+1 : c, 0);
                if (cell === "x") {
                    if (x_count > 4) {
                        return "";
                    } else if (x_count < 3) {
                        return "";
                    } else {
                        return "x";
                    }
                } else {
                    if (x_count === 3) {
                        return "x";
                    } else {
                        return "";
                    }
                }
            }));
        case "write":
            return update(state, {
                [action.y]: {[action.x] : {$set: action.v}}
            });
    }
    return state;
};
