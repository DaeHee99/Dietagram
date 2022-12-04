import "./App.css";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import ProfilePath from "./page/KaKao";
import Auth from "./page/KakaoAuth";
import Kakao from "./page/KaKao";
import { useState } from "react";

function App() {
  // const [loginOK, setLoginOK] = useState(false);

  // const loginHangler = (tf) => {
  //   setLoginOK(tf);
  // };

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
      {/* {!loginOK ? <LoginPage loginHangler={loginHangler} /> : <MainPage />} */}
    </div>
  );
}

export default App;
