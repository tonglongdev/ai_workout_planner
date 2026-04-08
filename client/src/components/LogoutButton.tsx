import { clearTokens } from "../api/token.service";

const LogoutButton = () => {
  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;