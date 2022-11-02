import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import {Order} from "../../models/order";
import {BasketItem} from "../../models/basket";

interface Props {
    order: Order;
    setOrderToView: (id: number) => void;
}

export default function OrderDetails({ order, setOrderToView }: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>
                <Button onClick={() => setOrderToView(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    )
}