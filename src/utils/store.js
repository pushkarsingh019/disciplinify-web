// store for the application
import {createStore, action, thunk} from "easy-peasy";
import axios from "axios";
const backendUrl = "http://localhost:8080"

const store = createStore({
    userData : {},
    addUserData : action((state, payload) => {
        state.userData = payload
    }),
});

export default store;