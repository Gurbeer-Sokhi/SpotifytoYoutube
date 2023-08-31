export default function Login() {
  const handle_login = () => {
    console.log("login");
    window.location.replace("http://localhost:5000/login");
  };
  return (
    <div>
      <button
        id="login"
        onClick={(e) => {
          e.preventDefault();
          handle_login();
        }}
      >
        Login
      </button>
    </div>
  );
}
