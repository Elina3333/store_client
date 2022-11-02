import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import agent from "../../api/agent";
import LoadingComponent from "../UI/LoadingComponent";
import {Order} from "../../models/order";
import Button from "@mui/material/Button";
import {currencyFormat} from "../../util/util";
import OrderDetails from "./OrderDetails";

const Orders = () => {
    const [orders,setOrders] = useState<Order[] | null>(null);
    const [loading,setLoading] = useState(true);
    const [orderToView,setOrderToView] = useState(0);

    useEffect(()=>{
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    if(loading) return <LoadingComponent message='Loading orders...' />

    if(orderToView > 0)
    {
        const order = orders?.find(order => order.id === orderToView);
        return <OrderDetails order={order!} setOrderToView={setOrderToView}/>
    }
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order date</TableCell>
                        <TableCell align="right">Order status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="right">
                                    <Button onClick={() => setOrderToView(order.id)}>View details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Orders;