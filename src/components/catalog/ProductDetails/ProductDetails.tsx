import React, {useEffect, useState} from 'react';
import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import NotFound from "../../../errors/NotFound";
import LoadingComponent from "../../UI/LoadingComponent";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../../store/configureStore";
import {addBasketItemAsync, removeBasketItemAsync} from "../../basket/basketSlice";
import {fetchProductAsync, productSelectors} from "../catalogSlice";

const ProductDetails = () => {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!))
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
    const {status : productStatus} = useAppSelector(state => state.catalog);


    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) if (typeof id === "string") {
            dispatch(fetchProductAsync(parseInt(id)));
        }
    }, [id, item,dispatch,product])

    function handleInputChange(event: any) {
        setQuantity((prevState) => parseInt(event.target.value));
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const addQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: addQuantity}))
        } else {
            const removeQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: removeQuantity}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product info'/>

    if (!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='primary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {product.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    {product.description}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brand
                                </TableCell>
                                <TableCell>
                                    {product.brand}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Quantity in stock
                                </TableCell>
                                <TableCell>
                                    {product.quantityInStock}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton sx={{height: '55px'}}
                                       color='primary'
                                       size='large'
                                       onClick={handleUpdateCart}
                                       variant='contained'
                                       loading={status.includes('pending' + product.id)}
                                       disabled={item?.quantity === quantity || !item && quantity === 0}
                                       fullWidth>
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductDetails;