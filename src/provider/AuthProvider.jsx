import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setUser({ token });
            // navigate("/dashboard");
        } else {
            setUser(null);
            navigate("/");
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token });
        navigate("/problem");
    };

    const logout = () => {
        console.log("loooooooo")
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
