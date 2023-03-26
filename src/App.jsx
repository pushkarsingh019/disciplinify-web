import { Routes, Route, BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

// importing screens
import LandingScreen from "./screens/LandingPage";
import Signup from "./screens/Signup";

// importing store
import store from "./utils/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
