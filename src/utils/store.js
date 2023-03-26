// store for the application
import {createStore, action, thunk} from "easy-peasy";
import axios from "axios";
const backendUrl = process.env.VITE_ORIGIN || "http://localhost:8080"

const store = createStore({
    userData : {},
    accessToken : localStorage.getItem("access_token"),
    addUserData : action((state, payload) => {
        localStorage.setItem("access_token", payload.accessToken)
        state.userData = payload
    }),
    signupUser : thunk(async (actions, payload) => {
        const {data} = await axios.post(`${backendUrl}/auth/newUser`, payload);
        const {user} = data;
        console.log(user)
    actions.addUserData(user);
    })
});

export default store;