import Catalog from "./components/catalog/Catalog";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./components/layout/Header";
import React, {useCallback, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./components/layout/home/HomePage";
import ContactPage from "./components/layout/contact/ContactPage";
import AboutPage from "./components/layout/about/AboutPage";
import ProductDetails from "./components/catalog/ProductDetails/ProductDetails";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "./errors/ServerError";
import NotFound from "./errors/NotFound";
import BasketPage from "./components/basket/BasketPage";
import LoadingComponent from "./components/UI/LoadingComponent";
import {useAppDispatch} from "./store/configureStore";
import {fetchBasketAsync} from "./components/basket/basketSlice";
import {fetchProductsAsync} from "./components/catalog/catalogSlice";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import {getCurrentUser} from "./components/account/accountSlice";
import Orders from "./components/order/Orders";
import CheckoutWrapper from "./components/checkout/CheckoutWrapper";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';

    const initApp = useCallback(async () => {
        try {
            await dispatch(getCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error: any) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [])

    function handleThemeChange() {
        setDarkMode(prevState => (!prevState));
    }

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    dispatch(fetchProductsAsync);

    if (loading) return <LoadingComponent message='Loading...'/>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Routes>
                <Route path='/home' element={<HomePage/>}/>
            </Routes>
            <Container sx={{mt: 6}}>
                <Routes>
                    <Route path='/catalog' element={<Catalog/>}/>
                    <Route path='/catalog/:id' element={<ProductDetails/>}/>
                    <Route path='/contact' element={<ContactPage/>}/>
                    <Route path='/about' element={<AboutPage/>}/>
                    <Route path='/server-error' element={<ServerError/>}/>
                    <Route path='/basket' element={<BasketPage/>}/>
                    <Route element={<BasketPage/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/checkout' element={<CheckoutWrapper/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
