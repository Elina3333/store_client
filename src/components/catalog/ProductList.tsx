import React from 'react';
import {Avatar, Grid} from "@mui/material";
import {Product} from "../../models/product";
import ProductCard from "./ProductCard";
import {useAppSelector} from "../../store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

const ProductList = ({products}: Props) => {
    const {productsLoaded} = useAppSelector(state => state.catalog)
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={4} key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton/>
                    ) : (
                        <ProductCard product={product} key={product.id}/>
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;