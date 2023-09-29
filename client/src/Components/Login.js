export default function Login() {
  const scope = "user-read-private user-read-email";
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirect_uri = "http://localhost:3000";

  const generateRandomString = (length) => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  const state = generateRandomString(16);

  console.log("login");
  const Auth_Url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
  // querystring.stringify({
  //   response_type: "code",
  //   client_id: client_id,
  //   scope: scope,
  //   redirect_uri: redirect_uri,
  //   state: state,
  // });

  return (
    <div>
      <a className="btn btn-success btn-lg" href={Auth_Url}>
        Login with Spotify
      </a>
    </div>
  );
}
