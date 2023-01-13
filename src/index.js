import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import {Firebase,db} from '../src/firebase/config'
import Context from './store/Context';

ReactDOM.render(
    <FirebaseContext.Provider value={{Firebase,db}}>
        <Context>
        <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
