import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashBoard({ code }) {
  const accessToken = useAuth(code);

  // const generate_token = async () => {
  //   let access_token = await axios.get(
  //     `http://localhost:5000/refresh_token?refresh_token=${refreshToken}`
  //   );
  //   console.log("access_token", access_token);
  // };

  return <div>{accessToken}</div>;
}
