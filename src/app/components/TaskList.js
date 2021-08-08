import React from 'react';
import { Checkbox, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const useStyles = makeStyles(theme => ({
    root:{},
    taskText: {
        width: '80%',
        '& .MuiListItemText-primary':{
            fontFamily: 'Montserrat',
            fontSize: '20px',
            color: '#5285EC',
        }
    }
}))

function TaskList({ list = [], handleToggle, deleteTask, editTask, ...props }){
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <List className={classes.root}>
                    {list.map( value => (<ListItem divider key={value._id} dense button onClick={handleToggle.bind(null, value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            color="default"
                            checked={!!(value.is_complete)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${value._id}` }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          id={`checkbox-list-label-${value._id}`} 
                          style={{ textDecoration: value.is_complete ? 'line-through' : 'none' }}
                          className={classes.taskText} 
                          primary={value.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={editTask.bind(null, value)}>
                            <EditRoundedIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={deleteTask.bind(null, value)}>
                            <DeleteRoundedIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}
                </List>
            </Grid>
        </Grid>
    );
}

export default React.memo(TaskList);