import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, MenuItem, Menu, Paper, Input, Button, Box, Typography } from '@material-ui/core';
import MenuBar from '../components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { login } from '../AppActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        background: '#F4F4F6',
        '& > *': {
            margin: theme.spacing(1),
            width: 296,
            height: 279,
            borderRadius: 12,
            boxShadow: '0px 3px 6px #00000029',
        },
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 20,
        // paddingRight: 28,
    },
    input: {
        background: '#EEF1F8 0% 0% no-repeat padding-box',
        width: '85%',
        border: 0,
        borderRadius: 8,
        padding: '16px 11px',
        fontSize: 14,
        fontFamily: 'Montserrat',
        marginBottom: 12,
        '&::-webkit-input-placeholder': {
            color: '#7A7D7E'
        }
        // 'normal normal medium 14px/18px Montserrat' 
    },
    button: {
        width: '85%',
        height: 40,
        background: '#5285EC',
        color: '#fff',
        '&.MuiButton-containedPrimary': {
            background: '#5285EC'
        }
    },
    title: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: 25,
        fontFamily: 'Montserrat',
        fontSize: 20,
        color: '#537178'
    }
}));



function Login(props){
    const classes = useStyles();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const selector = useSelector(data => data);
    const { register, handleSubmit } = useForm();

    if(token) return (<Redirect to="/home" />)
    
    const loginAction = login(dispatch);

    const onSubmit = data => {
        loginAction(data).then(()=> {
            props.history.push("/home");
        })
    }
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={0}>
                    <Box height={70}>
                        <Box height={20}/>
                        <Typography variant="h6" className={classes.title}>
                            Login
                        </Typography>
                    </Box>
                    <div className={classes.container}>
                        <input {...register("user_id")} placeholder="Id" className={classes.input} />
                        <input {...register("name")} placeholder="Name" className={classes.input} />
                    </div>
                    <Button color="primary" variant="contained" fullWidth className={classes.button} type="submit"> Login </Button>
                </Paper>
            </form>
        </div>
    );
}

export default Login;