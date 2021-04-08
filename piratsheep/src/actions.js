import Dispatcher from './dispatcher';
import ActionTypes from './constants';


class Actions {
    action() {
        Dispatcher.dispatch({
            actionType: ActionTypes.ACTION,
            payload: {}
        });
    }
}

export default new Actions();
