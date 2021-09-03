// third party
import React from 'react';
import ReactDOM from 'react-dom'; 
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// pages
// components
import App from './components/App';
import rootReducer from './reducers/rootReducer';
// styles


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.querySelector('#root')
);