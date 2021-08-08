import { addTaskFail, addTaskSuccess, completeTaskFail, completeTaskSuccess, dashboardFail, dashboardSuccess, loginError, loginSuccess } from "./AppActionsTypes";
import { addTask, authenticateUser, completeTask, deleteTask, getDashboard, updateTask } from "./services/AppServices"

export const login = (dispatch) => ({ user_id, name }) => {
    // return { type: 'LOGIN_SUCCESS', payload: { user_id, name } }
    return authenticateUser({ user_id, name })
    .then(({ token, user }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess({ user }));
    })
    .catch(error => {
        localStorage.clear()
        dispatch(loginError({ error }));
    })
}

export const getDashboardData = dispatch => _ => {
    return getDashboard()
        .then(({ data })=> dispatch(dashboardSuccess({ data })))
        .catch(error => dispatch(dashboardFail({ error })))
}

export const toCompleteTask = dispatch => (task) => {
    return completeTask(task._id)
        .then(({ data })=> dispatch(completeTaskSuccess({ data })))
        .catch(error => dispatch(completeTaskFail({ error })))
}

export const addNewTask = dispatch => name => {
    return addTask(name)
        .then(({ data })=> dispatch(addTaskSuccess({ data })))
        .catch(error => dispatch(addTaskFail({ error })))
}
export const deleteATask = dispatch => id => {
    return deleteTask(id)
        .then(({ data })=> dispatch(addTaskSuccess({ data })))
        .catch(error => dispatch(addTaskFail({ error })))
}

export const updateTaskOne = dispatch => (id, name) => {
    return updateTask(id, name)
        .then(({ data })=> dispatch(addTaskSuccess({ data })))
        .catch(error => dispatch(addTaskFail({ error })))
}