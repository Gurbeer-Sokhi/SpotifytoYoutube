import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;
    console.log("in useauth");
    axios
      .get(`http://localhost:5000/account?code=${code}`)
      .then((res) => {
        window.history.pushState({}, null, "/");
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((e) => {
        console.log(e);
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .get(
          `http://localhost:5000/refresh_token?refresh_token=${refreshToken}`
        )
        .then((res) => {
          window.history.pushState({}, null, "/");
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);
    return () => {
      clearInterval(interval);
      console.log("return interval");
    };
  }, [refreshToken, expiresIn]);

  return accessToken;
}
