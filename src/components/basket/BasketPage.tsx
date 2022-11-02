import React, {useState} from 'react';
import {Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Add, Delete, Remove} from "@mui/icons-material";
import agent from "../../api/agent";
import {LoadingButton} from "@mui/lab";
import BasketSummary from "./BasketSummary";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync, setBasket} from "./basketSlice";
import BasketTable from "./BasketTable";

const BasketPage = () => {

    const {basket} = useAppSelector(state => state.basket);
    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
           <BasketTable items={basket.items}/>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default BasketPage;