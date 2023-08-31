import useAuth from "./useAuth";

export default function DashBoard({ code }) {
  const accessToken = useAuth(code);
  return <div>{accessToken}</div>;
}
