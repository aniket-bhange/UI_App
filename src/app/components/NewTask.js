import React, { useEffect, useState } from 'react';
import { Container, makeStyles, Modal, InputBase, Button, Paper, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskSet } from '../AppActionsTypes';
 
const useStyles = makeStyles(theme => ({
    root: {
        '& h1':{
            fontFamily: "Montserrat",
            fontSize: "20px",
            color: "#537178",
            fontVariant: "normal",
            fontWeight: "600"
        }
    },
    newTaskContainer:{
        maxWidth: 400,
    },
    button: {
        // width: '85%',
        textTransform: 'capitalize',
        height: 40,
        fontSize: '14px',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        background: '#5285EC',
        color: '#fff',
        '&.MuiButton-containedPrimary': {
            background: '#5285EC'
        }
    },
    container:{
        marginTop: theme.spacing(4),
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "center"
    },
    newTask: {
        background: "#EEF1F8",
        width: '100%',
        borderRadius: 8,
        padding: theme.spacing(0.8, 2),
        margin: theme.spacing(1.5, 0),
        
    }

}))

function NewTask({ open, handleClose, addNewTask, editTask, ...props }){
    const classes = useStyles();
    const dispatch = useDispatch();
    const task = useSelector(data => data?.taskToUpdate);
    const [name, setName] = useState("");
    
    useEffect(()=> {
        setName(task?.name||"")
    }, [ task ])


    return (
        <Modal 
            open={open}
            onClose={handleClose}
        >
            <Container className={classes.newTaskContainer}>
                <Paper className={classes.container}>
                    <div className={ classes.root }>
                        <h1> + New Task </h1>
                        <div>
                            <InputBase placeholder="Task Name" value={name} onChange={ e => setName(e.target.value) } className={classes.newTask} />
                            <Button color="primary" variant="contained" fullWidth className={classes.button} onClick={task?._id ? editTask.bind(null, {...task, name}) : addNewTask.bind(null, name)}> { task?._id ? 'Update' : '+ New' } Task </Button>
                        </div>
                    </div>
                </Paper>
            </Container>
        </Modal>
    );
}

export default React.memo(NewTask)