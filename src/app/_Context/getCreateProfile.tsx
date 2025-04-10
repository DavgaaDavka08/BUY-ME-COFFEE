"use client";
import axios from "axios";
import CoffeeType from "../../../utils/Types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Ensure the context type allows `undefined`
type UserContextType = {
  callData: CoffeeType[] | null;
  setCallData: React.Dispatch<React.SetStateAction<CoffeeType[] | null>>;
} | null;

// Create the context with `null` as the default
export const UserContext = createContext<UserContextType>(null);

// Hook to access the context safely
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider Component
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [callData, setCallData] = useState<CoffeeType[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getProfiles"
        );
        setCallData(response.data?.users ?? null);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <UserContext.Provider value={{ callData, setCallData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
