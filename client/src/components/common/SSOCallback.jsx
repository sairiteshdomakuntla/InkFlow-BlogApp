import { useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const { user } = useUser(); // Get the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirectCallback().then(() => {
      if (user) {
        // Redirect based on user email or role
        const email = user.primaryEmailAddress?.emailAddress || "";
        if (user.publicMetadata.role === "author") {
          navigate(`/author-profile/${email}`);
        } else {
          navigate(`/user-profile/${email}`);
        }
      } else {
        navigate("/"); // Default fallback
      }
    });
  }, [user]);

  return <p>Redirecting...</p>;
}
