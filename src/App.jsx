import { Routes, Route, BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

// importing screens
import HomeScreen from "./screens/HomeScreen";

// importing store
import store from "./utils/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
