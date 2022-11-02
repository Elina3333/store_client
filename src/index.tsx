import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import BrowserRouter from "./BrowserRouter";
import {Provider} from "react-redux";
import {store} from "./store/configureStore";
import {fetchProductsAsync} from "./components/catalog/catalogSlice";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Routes} from "react-router-dom";

store.dispatch(fetchProductsAsync());

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();