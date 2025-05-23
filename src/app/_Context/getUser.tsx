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
type UserContextType = {
    callUser: CoffeeType[] | null;
    setCallUser: React.Dispatch<React.SetStateAction<CoffeeType[] | null>>;
} | null;
export const UserContext = createContext<UserContextType>(null);
export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProviders");
    }
    return context;
};
const UserProviders = ({ children }: { children: ReactNode }) => {
    const [callUser, setCallUser] = useState<CoffeeType[] | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/getNevtreh"
                );
                setCallUser(response.data?.users ?? null);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <UserContext.Provider value={{ callUser, setCallUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProviders;
