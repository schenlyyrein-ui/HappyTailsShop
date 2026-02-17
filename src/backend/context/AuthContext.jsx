import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ht_token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-load user on refresh if token exists
  useEffect(() => {
    async function boot() {
      try {
        if (!token) {
          setUser(null);
          return;
        }
        const data = await authApi.me(token);
        setUser(data.user);
      } catch (e) {
        localStorage.removeItem("ht_token");
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [token]);

  const value = useMemo(() => ({
    user,
    token,
    loading,

    async login(email, password, remember) {
      const data = await authApi.login({ email, password });
      if (remember) localStorage.setItem("ht_token", data.token);
      setToken(data.token);
      setUser(data.user);
    },

    async signup(payload, remember) {
      const data = await authApi.register(payload);
      if (data.token && remember) localStorage.setItem("ht_token", data.token);
      if (data.token) setToken(data.token);
      setUser(data.user || null);
    },

    logout() {
      localStorage.removeItem("ht_token");
      setToken("");
      setUser(null);
    },
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}