import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePath = () => {
  const navigate = useNavigate();
  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      console.log(data);

      await axios
        .post(
          "http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/oauth/login",
          {
            id: data.id,
            nickname: data.properties.nickname,
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("nickname", response.data.nickname);
          navigate("/main");
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
};
export default ProfilePath;
