import {Button, Container, Divider, Paper, Typography} from "@mui/material";
import {useLocation} from 'react-router-dom';
import {history} from "../BrowserRouter";

const ServerError = () => {
    const {state} = useLocation();
    console.log(state)

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h4' style={{color:'red'}} gutterBottom>Server error</Typography>
                    <Divider/>
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography></Typography>
            )}
            <Button onClick = {() => history.push('/catalog')}>Go back to the store</Button>
        </Container>
    );
};

export default ServerError;