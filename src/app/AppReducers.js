import { COMPLETE_TASK_FAIL, COMPLETE_TASK_SUCCESS, DASHBOARD_FAIL, DASHBOARD_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, UPDATE_TASK_RESET, UPDATE_TASK_SET } from "./AppActionsTypes";


const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState = user ? { isLoggedIn: true, user, tasks: [], dashboard: {}, taskToUpdate: {} } : { isLoggedIn: false, user: null, tasks: [], dashboard: {}, taskToUpdate: {} };

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload.error
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            }
        case DASHBOARD_SUCCESS: 
            return {
                ...state,
                dashboard: payload.data,
            }
        case DASHBOARD_FAIL: 
            return {
                ...state,
                dashboardError: payload.error
            }
        case COMPLETE_TASK_SUCCESS:
            return {
                ...state,
            }
        case COMPLETE_TASK_FAIL:
            return {
                ...state,
            }
        case UPDATE_TASK_SET: 
            return {
                ...state,
                taskToUpdate: payload.data
            }
        case UPDATE_TASK_RESET:
            return {
                ...state,
                taskToUpdate: {}
            }
        default:
            return state;
    }
}