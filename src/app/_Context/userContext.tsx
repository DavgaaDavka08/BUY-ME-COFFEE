"use client";

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
    fetch("/api/coffee")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCallData(json.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <UserContext.Provider value={{ callData, setCallData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
