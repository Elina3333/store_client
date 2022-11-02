import React, {useEffect} from 'react';
import ProductList from "./ProductList";
import LoadingComponent from "../UI/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams} from "./catalogSlice";
import {Box, Grid, Pagination, Paper, Typography} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../UI/RadioButtonGroup";
import CheckBoxButtons from "../UI/CheckBoxButtons";
import AppPagination from "../UI/AppPagination";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - high to low'},
    {value: 'price', label: 'Price - low to high'}
]

const Catalog = () => {

    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        status,
        filtersLoaded,
        brands,
        types,
        productParams,
        metaData
    } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) {
        return <LoadingComponent message='Loading products...'/>
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup options={sortOptions}
                                      onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                                      selectedValue={productParams.orderBy}/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckBoxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckBoxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9} sx={{mb:2}}>
                {metaData &&
                    <AppPagination metaData={metaData}
                                   onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}/>
                }
            </Grid>
        </Grid>
    );
};

export default Catalog;