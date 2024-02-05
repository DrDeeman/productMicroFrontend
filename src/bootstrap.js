import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Remote from './remotes/remote';
import Test from './App/test_component';


ReactDOM.createRoot(document.querySelector('#root')).render(
<div>
<Test/>
<Remote/>
</div>
);