import React, { useCallback, useEffect, useState } from 'react';
import { alpha, Box, Button, Container, Grid, InputBase, makeStyles, Paper, Typography } from "@material-ui/core"
import MenuBar from "../components/MenuBar";
import PieChart, { Series, Label, Legend, Size, Font, Connector } from 'devextreme-react/pie-chart';
import { Search } from '@material-ui/icons'
import TaskList from '../components/TaskList';
import NewTask from '../components/NewTask';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, deleteATask, getDashboardData, toCompleteTask, updateTaskOne } from '../AppActions';
import { updateTaskReset, updateTaskSet } from '../AppActionsTypes';

const useStyles = makeStyles(theme => ({
    backgroundContainerColor: {
        background: '#F4F4F6',
    },
    root: {
        background: '#F4F4F6',
        height: '100vh',
    },
    container: {
        marginTop: 20,
        width: '100%',
        paddingTop: 37,
        paddingBottom: 37
    },
    title:{
        color: '#537178',
        fontSize: 20,
        fontFamily: 'Montserrat',
        lineHeight: '28px'
    },
    button: {
        color: '#fff',
        textTransform: 'capitalize',
        marginTop: 20,
        fontFamily: 'Montserrat',
        '&.MuiButton-containedPrimary': {
            background: '#5285EC'
        }
    },
    noMarginTop: { marginTop: 0 },
    holder: {
        height: '90vh'
    },
    dbPaper: {
        // width: '100%',
        textAlign: 'left',
        padding: 24,
        margin: '20px 20px',
        background: '#fff',
        boxShadow: '0px 3px 6px #0000000A',
        borderRadius: 12,
        minHeight: 150,
    },
    taskCompleted: {
        // width: '100%',
        '& h1, h3':{
            margin:0,
            fontFamily: 'Montserrat'
        },
        '& h1':{
            fontSize: '64px',
            lineHeight: '78px',
            color: '#5285EC'
        },
        '& h3':{
            fontSize: '20px',
            lineHeight: '20px',
            color: '#8F9EA2',
            paddingLeft: 37,
            marginTop: -15
        },
    },
    recentTask:{
        '& li':{
            lineHeight: '20px',
            fontSize: 14,
            color: '#8F9EA2',
            marginTop: 5,
            marginBottom: 5
        }
    },
    chart:{

    },
    pie: {
    },
    search: {
        position: 'relative',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#D9DFEB",
        '&:hover': {
            // backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
    },
    searchIcon: {
        padding: theme.spacing(1, 2),
        // height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1,1,1,0),
    },
    searchContainer:{
        background: '#f4f4f6',
        margin: theme.spacing(0.5, 2)
        // height: 100,
    },
}))

const _pieData = [{
    id: 1,
    name: 'Completed Task',
    area: 0.25
}, {
    id: 2,
    name: 'Not Completed Task',
    area: 0.75
}]



const NoTask = ({ classes }) => (<Grid container direction="row" justifyContent="center" alignItems="center">
<Grid item  xs sm={3}>
    <Paper elevation={0} className={classes.container}>
        <Typography variant="h6" className={classes.title}>
            You have no task.
        </Typography>
        <Button color="primary" variant="contained" className={classes.button}> + New Task</Button>
    </Paper>
</Grid>
</Grid>);


function Home( props ){

    const classes = useStyles();
    const { user, dashboard, taskToUpdate } = useSelector(data => data); 
    const dispatch = useDispatch();
    const [isNewTaskModalOpen, setNewTaskModal] = useState(false);
    const [pieData, setPieData] = useState(_pieData);
    const [ taskList, setTaskList ] = useState([])
    const getDashboardAction = getDashboardData(dispatch);
    const toCompleteTaskAction = toCompleteTask(dispatch);
    const addNewTaskAction = addNewTask(dispatch);
    const deleteTaskAction = deleteATask(dispatch);
    const updateTaskAction = updateTaskOne(dispatch);
    const newTaskModel = value => {
        setNewTaskModal(!!value);
    }
    const completeTask = (value)=> {
        console.log(value)
        if(!value.is_complete) toCompleteTaskAction(value).then(result => getDashboardAction())
    }
    const editTask = value => {
        updateTaskAction(value._id, value.name).then(result => getDashboardAction())
        dispatch(updateTaskReset());
        newTaskModel(false);
    }
    const addNewTaskHandler = name => {
        addNewTaskAction(name).then(result => getDashboardAction())
        newTaskModel(false)
    }
    const deleteTask = value => {
        deleteTaskAction(value._id).then(result => getDashboardAction())
    }
    const editTaskModal = (value)=> {
        if(value.is_complete) return;
        dispatch(updateTaskSet({ data: value }));
        setTimeout(()=>newTaskModel(true),10);
    }
    useEffect(()=> getDashboardAction(), []);

    const searchTask = str => {
        const { allTasks } = dashboard;
        console.log(str)
        if(str.length > 2){            
            const tasks = allTasks.filter(val => val.name.match(new RegExp(str, 'ig')))
            return setTaskList(tasks);
        }
        setTaskList(allTasks);
    }

    useEffect(()=> {
        const { taskCompleted, totalTask, allTasks } = dashboard;
        const [ completedTaskData, totalTaskData ] = pieData
        completedTaskData.area =  taskCompleted/totalTask;
        totalTaskData.area = 1 - completedTaskData.area;
        setPieData([ completedTaskData, totalTaskData ]);
        setTaskList(allTasks);
        console.log(taskCompleted, totalTask, totalTaskData, completedTaskData, "this is data adter fashboard ")
    }, [ dashboard ])

    return (
        <div className={classes.root}>
            <MenuBar name={ user.name } profilePicture={user.profile_picture} history={props.history} />
            <Container>
                <Grid container >
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.dbPaper}>
                            <Typography variant="h6" className={classes.title}>
                                Tasks Completed
                            </Typography>
                            <div className={classes.taskCompleted}>
                                <h1> { dashboard.taskCompleted } </h1>
                                <h3>/ { dashboard.totalTask }</h3>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.dbPaper}>
                            <Typography variant="h6" className={classes.title}>
                                Latest Created Tasks
                            </Typography>
                            <div className={classes.recentTask}>
                                <ul>
                                    { dashboard?.latestTasks?.map(value => (<li style={{ textDecoration: value.is_complete ? 'line-through' : 'none' }} key={ value._id }>{ value.name }</li>)) }
                                </ul>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.dbPaper}>
                            <div className={classes.chart}>
                                <PieChart
                                    className={classes.pie}
                                    title=""
                                    sizeGroup="piesGroup"
                                    dataSource={pieData}
                                    diameter={0.8}
                                    palette={["#5285EC", "#E8ECEC",]}
                                >
                                    <Size width={'100%'} height={150} />
                                    <Series  argumentField="name" valueField="area">
                                        <Label 
                                            visible={true} 
                                            position="outside" 
                                            backgroundColor="#fff"
                                            textOverflow="none"
                                            customizeText={(txt)=> txt.argumentText }
                                            >
                                            <Font color="#5285EC" />
                                            <Connector visible={true} width={0.5} />
                                        </Label>
                                    </Series>
                                    <Legend 
                                        visible={false}
                                        verticalAlignment="bottom"
                                        horizontalAlignment="center"
                                        itemTextPosition="right"
                                        rowCount={2}                                    
                                    />
                                </PieChart>
                            </div>
                        </Paper>
                    </Grid>                    
                </Grid>
                <Grid container className={classes.backgroundContainerColor}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.title}>
                            Tasks
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={classes.searchContainer}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Search />
                                </div>
                                <InputBase
                                    placeholder="Search by task name"
                                    onChange={e => searchTask(e.target.value)}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box className={classes.searchContainer}>
                            <Button color="primary" variant="contained" onClick={e => {
                                dispatch(updateTaskReset());
                                newTaskModel(true)
                            }} fullWidth className={[classes.button, classes.noMarginTop].join(" ")} > + New Task </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box height={20} width="100%" bgcolor="#F4F4F6" />
                <TaskList list={taskList} handleToggle={completeTask} deleteTask={deleteTask} editTask={editTaskModal}  />
                <Box height={40} width="100%" bgcolor="#F4F4F6" />
            </Container>
            <NewTask open={isNewTaskModalOpen} editTask={editTask} handleClose={newTaskModel.bind(null, false)} addNewTask={addNewTaskHandler} />
        </div>
    )
}

export default Home