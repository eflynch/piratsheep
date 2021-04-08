import update from 'immutability-helper';
import { EventEmitter } from 'events';
import Dispatcher from './dispatcher';
import ActionTypes from './constants';

const CHANGE = 'CHANGE';

class Store extends EventEmitter {
    constructor() {
        super();

        Dispatcher.register(this._handleAction.bind(this));
        this._sessionWrapper = null;
    }

    _handleAction(action) {
        switch(action.actionType) {
            case ActionTypes.ACTION: {
                this.emit(CHANGE);
                break;
            }
        }
    }

    getState() {
        return {};
    }

    addOnChange(callback) {
        this.on(CHANGE, callback);
    }

    removeOnChange(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new Store();
