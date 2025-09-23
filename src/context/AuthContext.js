// src/context/AuthContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const isRemembered = localStorage.getItem("isRemembered") === "true";

        if (savedUser && token && isRemembered) {
            setUser(JSON.parse(savedUser));
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("isRemembered");
        }
        setLoading(false);
    }, [user]);

    const login = async (email, password, rememberMe) => {

        try {
            const res = await api.post("/login", { email, password });
            const { user, token } = res.data;
            console.log("🚀 ~ login ~ user.company_id:", user.company_id);

            // Update AuthContext state
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("company_id", user.company_id); // Ensure this is not commented out
            localStorage.setItem("token", token);
            localStorage.setItem("isRemembered", rememberMe);

            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            router.push("/");
            return user;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("company_id");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isRemembered");
        localStorage.removeItem("rememberedEmail");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);