import "./LoginPage.css";
import Logo from "../images/logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Kakao from "../images/kakao_login.png";
import Naver from "../images/naver_logo.png";
import Link from "@mui/material/Link";
import { useState } from "react";
import NaverLogin from "./naverlLogin";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const REST_API_KEY_kakao = "aa6241f0d2d67478a59c2498796a248c";
const Testing_URI = "http://localhost:3000"; //http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080
const REDIRECT_URI_kakao = "http://localhost:3000/logininfo";
const KaKao_Rest_API = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_kakao}&redirect_uri=${REDIRECT_URI_kakao}&response_type=code`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginClick = () => {
    console.log(email);
    console.log(values.password);
  };

  return (
    <>
      <div className="LoginPage">
        <div className="login">
          <div id="logo_img">
            <img src={Logo} alt="logo" />
          </div>
          <div>
            <TextField
              label="이메일"
              value={email}
              onChange={changeEmail}
              variant="outlined"
              sx={{ width: "80%", marginBottom: 1 }}
            />
            <br />
            <FormControl
              sx={{ width: "80%", marginBottom: 6 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              id="loginButton"
              variant="contained"
              sx={{ width: "80%" }}
              onClick={loginClick}
            >
              로그인
            </Button>
            <br />
            <br />
            <hr />
            <br />
            <div>
              <img
                className="snsLogin"
                src={Naver}
                alt="naver"
                id="naverIdLogin"
                onClick={NaverLogin.Initial}
              />
              <a href={KaKao_Rest_API}>
                <img className="snsLogin" src={Kakao} alt="kakao" />
              </a>
            </div>
            <br />
          </div>
        </div>
        <div className="login" id="sign">
          계정이 없으신가요?
          <Link
            href="http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/auth/signup"
            underline="none"
          >
            {" 가입하기"}
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
