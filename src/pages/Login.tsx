import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>(""); // State for email input
  const [password, setPassword] = useState<string>(""); // State for password input
  const [error, setError] = useState<string | null>(null); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); // Clear email and password fields after successful login
      setPassword("");
      setError(null);
    } catch {
      setError(
        "Failed to log in. Please check your credentials and try again.",
      ); // Set error message if login fails
    }
  };

  const handleRegisterRedirect = () => {
    // Redirect to registration page when user clicks "Register Now"
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">
          Log In
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <p className="register-redirect">
        Don't have an account?
        <button
          type="button"
          className="register-redirect-button"
          onClick={handleRegisterRedirect}
        >
          Register Now
        </button>
      </p>
    </div>
  );
};

export default Login;
