import React from 'react';
import ReactDOM from 'react-dom';
import HelloMessage from './message'
import TodoApp from './todo'

$('body').append('<div id="hiapp"></div>');
$('body').append('<div id="todoapp"></div>');

//qreqwer

ReactDOM.render(<HelloMessage name="React" />,
    document.getElementById('hiapp')
);

ReactDOM.render(<TodoApp />,
    document.getElementById('todoapp')
);