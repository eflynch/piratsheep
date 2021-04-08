import React from 'react';

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        window.onkeydown = (e) => {
            if (e.keyCode === 77) { // m
                Actions.action();
            }
        };
    }

    render () {
        return (
            <div>
                hello world
            </div>
        );
    }
}
