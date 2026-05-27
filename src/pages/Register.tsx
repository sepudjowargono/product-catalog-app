import { useState, type SubmitEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>(""); // State for username input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to login page
  };

  const handleRegister = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
      setEmail(""); // Clear email and password fields after successful registration
      setPassword("");
      setError(null);
    } catch {
      setError("Failed to register. Please try again."); // Set error message if registration fails
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button className="register-button" type="submit">
          Register Now
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <p className="login-redirect">
        Already have an account?
        <button
          type="button"
          className="login-redirect-button"
          onClick={handleLoginRedirect}
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default Register;
