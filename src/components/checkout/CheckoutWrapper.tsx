import React, {useEffect, useState} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch} from "../../store/configureStore";
import agent from "../../api/agent";
import LoadingComponent from "../UI/LoadingComponent";

const stripePromise = loadStripe('pk_test_51LxVqtKumW8bszjq0yPEoEzpjQnTvvCTNXIhktBSXoAgYR3nUz1uc1h4GfOZObxrnhLKWanW1g1skqcY1nd4H3VI00aqhcKgMP');

const CheckoutWrapper = () => {
    const dispatch = useAppDispatch();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentsIntent()
            .then(basket => dispatch(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[dispatch])

    if(loading) return <LoadingComponent message='Loading checkout...'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    );
};

export default CheckoutWrapper;