import "./App.css";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePath from "./page/KaKao";
import Auth from "./page/KakaoAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/logininfo" element={<Auth />} />
          <Route path="/profile" element={<ProfilePath />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
