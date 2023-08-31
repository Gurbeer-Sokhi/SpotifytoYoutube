import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;
    axios
      .post(`http://localhost:5000/account`, { code })
      .then((res) => {
        window.history.pushState({}, null, "/");
        console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        console.log(refreshToken);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
          setExpiresIn(61);
        })
        .catch(() => {
          window.location = "/";
        });

      return () => clearInterval(interval);
    }, (expiresIn - 60) * 1000);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
