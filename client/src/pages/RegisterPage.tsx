import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { mutate, isPending } = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={isPending}>
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
