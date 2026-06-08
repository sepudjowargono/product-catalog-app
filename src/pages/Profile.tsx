import { useEffect, useState, type SubmitEvent } from "react";
import { auth } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

// define the Profile component, which will allow users to view and edit their profile information, as well as delete their account if they choose to do so
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const profile = await getUserProfile(currentUser.uid);

      if (profile) {
        setUsername(profile.username);
        setEmail(profile.email);
      }
    };

    fetchProfile();
  }, []);

  // function to handle the submission of the profile update form, allowing users to update their username and email address
  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) return; // if no user is authenticated, exit the function

    // try to update the  user's profile information in the backend, and display a success message if the update is successful
    try {
      await updateUserProfile(currentUser.uid, {
        username,
        email,
      });

      setMessage("Your profile has been updated successfully.");
    } catch (error) {
      console.error("Failed to update your profile. Please try again.", error);
      setError("Profile update failed. Please try again.");
    }
  };

  // function to handle the deletion of the user's account, allowing users to premanently delete their account and all associated data from the application
  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    try {
      await deleteUserProfile(currentUser.uid); // delete the user's profile information from the backend
      await deleteUser(currentUser);
    } catch (error) {
      console.error("Failed to delete your account. Please try again.", error);
      setError("Failed to delete your account. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <p>Username: {username}</p>
      <p>Email: {email}</p>

      <form className="profile-form" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="profile-button" type="submit">
          Update Profile
        </button>
      </form>

      <button className="profile-delete-button" onClick={handleDeleteAccount}>
        Delete Account
      </button>

      {message && <p className="profile-message">{message}</p>}
      {error && <p className="profile-error">{error}</p>}
    </div>
  );
};

export default Profile;
