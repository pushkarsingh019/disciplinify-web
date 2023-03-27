import { Routes, Route, BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

// importing screens
import LandingScreen from "./screens/LandingPage";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Login";

// importing store
import store from "./utils/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
