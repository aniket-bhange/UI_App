export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
export const DASHBOARD_FAIL = "DASHBOARD_FAIL";
export const LOGOUT = "LOGOUT";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAIL = "ADD_TASK_FAIL";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const COMPLETE_TASK_SUCCESS = "COMPLETE_TASK_SUCCESS";
export const COMPLETE_TASK_FAIL = "COMPLETE_TASK_FAIL";
export const UPDATE_TASK_SET = "UPDATE_TASK_SET";
export const UPDATE_TASK_RESET = "UPDATE_TASK_RESET";


export const loginSuccess = data => ({ type: LOGIN_SUCCESS, payload: data });
export const loginError = error => ({ type: LOGIN_FAIL, payload: error });
export const dashboardSuccess = data => ({ type: DASHBOARD_SUCCESS, payload: data });
export const dashboardFail = error => ({ type: DASHBOARD_FAIL, payload: error });
export const completeTaskSuccess = data => ({ type: COMPLETE_TASK_SUCCESS, payload: data });
export const completeTaskFail = error => ({ type: COMPLETE_TASK_FAIL, payload: error });
export const addTaskSuccess = data => ({ type: ADD_TASK_SUCCESS, payload: data });
export const addTaskFail = error => ({ type: ADD_TASK_FAIL, payload: error });
export const updateTaskSet = data => ({type: UPDATE_TASK_SET, payload: data })
export const updateTaskReset = data => ({type: UPDATE_TASK_RESET })
