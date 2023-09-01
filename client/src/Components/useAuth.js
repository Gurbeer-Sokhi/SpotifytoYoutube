import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;
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
    if (!refreshToken) return;
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

      return () => clearInterval(interval);
    }, (expiresIn - 60) * 1000);
  }, [refreshToken, expiresIn]);

  return <div>{accessToken}</div>;
}
