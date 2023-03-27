// store for the application
import {createStore, action, thunk} from "easy-peasy";
import axios from "axios";
const mode = "development"
const backendUrl = mode === "production" ? "https://disciplinify-backend.vercel.app" : "http://localhost:8080"
console.log(`backend connected -> ${backendUrl}`)

const store = createStore({
    userData : {},
    errorMessage : "",
    accessToken : localStorage.getItem("access_token"),
    updateError : action((state, payload) => state.errorMessage = payload),
    addUserData : action((state, payload) => {
        localStorage.setItem("access_token", payload.accessToken)
        state.userData = payload
    }),
    signupUser : thunk(async (actions, payload) => {
        const {data} = await axios.post(`${backendUrl}/auth/newUser`, payload);
        const {user} = data;
        console.log(user)
        actions.addUserData(user);
        actions.updateError("")
    }),
    loginUser: thunk(async (actions, payload) => {
        try {
            const {data} = await axios.post(`${backendUrl}/auth/loginUser`, payload);
            const {user} = data;
            const accessToken = data.accessToken;
            actions.addUserData(user);
            localStorage.setItem("access_token", accessToken);
            actions.updateError("")
        } catch (error) {
            if (error.response) {
                const {data, status} = error.response;
                if (status === 400) {
                    // wrong password
                    console.log(data);
                    actions.updateError(data);
                } else if (status === 409) {
                    // user does not exist
                    console.log(data);
                    actions.updateError(data);
                } else {
                    // handle other errors
                    console.log("Internal server error");
                }
            } else {
                // handle network errors
                console.log("Network error occurred");
            }
        }
    })
    
});

export default store;