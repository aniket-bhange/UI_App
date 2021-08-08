import { createStore } from "redux";
import rootReducers from './AppReducers'

const store = createStore(rootReducers)

export default store
