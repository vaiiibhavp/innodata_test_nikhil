import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';

function Example() {
    return (
        <Register/>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
