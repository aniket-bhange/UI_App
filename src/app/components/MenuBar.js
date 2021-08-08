import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, MenuItem, Menu, Avatar, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: '#fff'
    },
    title: {
        // font: 'normal normal medium 16px/19px Montserrat',
        fontFamily: 'Montserrat',
        fontSize: 16,
        lineHeight: '40px',
        color: '#6D8187',
        textTransform: "capitalize"
    },
    toolBar:{
        width: '90%',
        margin:'0px auto',
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "space-between"
    },
    profile: {
        display: "flex",
        width: "40%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-start"
    },
    user:{
        marginLeft: 30,
        paddingTop: 8,
        // paddingBottom: 8,
        width: '50%',
        textAlign: "left"
    },
    avatar: {
        width: 48,
        height: 48
    },
    button:{
        color: '#6D8187',
        textTransform: 'capitalize',
        fontFamily: 'Montserrat',
        fontSize: '16px'
    }
    
}));

function MenuBar({ name, profilePicture, history, ...props }){
    const classes = useStyles();
    const onLogout = ()=> {
        localStorage.clear();
        history.go("/login");
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar className={classes.toolBar}>
                    <div className={classes.profile}>
                        <Avatar className={classes.avatar} src={profilePicture} />
                        <div className={classes.user}>
                            <Typography variant="h6" className={classes.title}>
                                { name }
                            </Typography>
                        </div>
                    </div>
                    <Button onClick={e => onLogout() } className={classes.button}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MenuBar;