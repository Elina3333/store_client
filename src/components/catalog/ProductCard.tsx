import React, {useState} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Product} from "../../models/product";
import {Link} from "react-router-dom";
import agent from "../../api/agent";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../util/util";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {addBasketItemAsync} from "../basket/basketSlice";

interface Props {
    product: Product;
    key: number;
}

const ProductCard = ({product}: Props) => {

    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'orange'}}>
                        {product.brand.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight:'bold',color:'primary.main'}
                }}
            />
            <CardMedia
                title={product.name}
                sx={{height: 140, backgroundSize: 'contain'}}
                image={product.pictureUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='primary'>
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status === ('pendingAddItem' + product.id)} onClick={()=>dispatch(addBasketItemAsync({productId:product.id,quantity:1}))} size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;