import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Wrapper from './components/provider/provider'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
