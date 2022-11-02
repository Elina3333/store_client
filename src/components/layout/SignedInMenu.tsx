import React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {signOut} from "../account/accountSlice";
import {Link, useNavigate} from "react-router-dom";
import {clearBasket} from "../basket/basketSlice";

const SignedInMenu = () => {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const signOutHandler = () => {
        dispatch(signOut());
        navigate('/home')
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{typography: 'p'}}
            >
                Hello, {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to='orders'>My orders</MenuItem>
                <MenuItem onClick={() => {
                    signOutHandler();
                    dispatch(clearBasket());
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default SignedInMenu;