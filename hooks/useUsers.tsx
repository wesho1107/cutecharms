import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

interface User {
  id: number;
  name: string;
  image: any;
  currency: number;
}

export function useUsers() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInformation() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const token = await user.getIdToken();
        const response = await fetch("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setUserInfo({
          id: data.profile.id,
          name: data.profile.nickname,
          image: data.profile.avatar,
          currency: data.profile.currency,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUserInformation();
  }, []);

  return { userInfo, loading, error };
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to create a user
  const createUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await user.getIdToken();
      const response = await fetch("http://localhost:3000/api/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: "Guest User " + Math.floor(Math.random() * 1000),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      return await response.json(); // Return response data if needed
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err; // Re-throw the error so the caller can handle it
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}
