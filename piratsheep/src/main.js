import React from 'react';
import {render} from 'react-dom';

import App from './components/app';


const main = () => {
    render(<App />, document.getElementById("content"));
};


document.addEventListener("DOMContentLoaded", function (){
    main();
});
