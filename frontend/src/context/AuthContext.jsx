import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token in localStorage on mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['x-auth-token'] = storedToken;
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // Update axios defaults and localStorage when token changes
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('https://backend-resume-builder.vercel.app/api/auth/login', {
                email,
                password,
            });
            setToken(res.data.token);
            return true;
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post('https://backend-resume-builder.vercel.app/api/auth/register', {
                username,
                email,
                password,
            });
            setToken(res.data.token);
            return true;
        } catch (err) {
            console.error('Registration error:', err);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

