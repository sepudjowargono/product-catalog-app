import { useState, type SubmitEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>(""); // State for username input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const newUser = userCredential.user; // get the newly created user

      // save user data to Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        username,
        email: newUser.email,
        createdAt: serverTimestamp(),
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);

      navigate("/"); // redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
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
          onClick={() => navigate("/")}
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default Register;
