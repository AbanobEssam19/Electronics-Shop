'use client'
import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            let token = localStorage.getItem('token');

            if (!token) {
                token = sessionStorage.getItem('token');
            }

            const res = await fetch("/api/user", {
                headers: {
                    'Authorization': `${token}`
                }
            });

            const data = await res.json();
            setUser(data.user);
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export function useUser() {
    return useContext(UserContext);
}