import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out."); // Alert user on successful logout
    } catch {
      alert("Failed to log out. Please try again."); // Alert user if logout fails
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
