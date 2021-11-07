import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './pages/layout/layout';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from 'easy-peasy';
import { store } from "./shared/store/store";

function Index() {
  return (
    <StoreProvider store={store}>
      <Layout />
    </StoreProvider>
  );
}
ReactDOM.render(
 <Index />,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
