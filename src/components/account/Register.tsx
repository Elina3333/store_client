import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import { useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../store/configureStore";
import agent from "../../api/agent";
import React from "react";
import {toast} from "react-toastify";

const Register = () => {

    const {
        register, handleSubmit,setError, formState: {
            isSubmitting, errors, isValid
        }
    } = useForm({mode: 'onTouched'})
    const navigation = useNavigate();
    const dispatch = useAppDispatch();

    function handleApiErrors(errors : any) {
        if(errors)
        {
            errors.forEach((error : string) => {
                if(error.includes('Password'))
                {
                    setError('password',{message : error})
                }
                else if (error.includes('Email'))
                {
                    setError('email',{message : error})
                }
                else if (error.includes('Username'))
                {
                    setError('username',{message : error})
                }
            })
        }
    }



    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) => agent.Account.register(data).then(()=>{
                toast.success('Registration successful - you can login now');
                navigation('/login');
            })
                .catch(error => handleApiErrors(error)))} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', {required: 'Email is required',pattern : {value : /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                        message: "Not a valid Email address"}})}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password',{required : 'Password is required',pattern : {value : /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message : 'Password does not meet complexity requirements'}})}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
                />
                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    disabled={!isValid}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link style={{textDecoration:"none"}} to="/register">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Register;