import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the user's profile row from public.profiles
  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone")
      .eq("id", userId)
      .single();

    if (error) {
      // If profile doesn't exist or RLS blocks it, keep profile null
      setProfile(null);
      return null;
    }

    setProfile(data);
    return data;
  }

  // Initialize session + keep state in sync on auth changes
  useEffect(() => {
    let alive = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!alive) return;

      if (error) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const sessionUser = data?.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        await loadProfile(sessionUser.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;

      setUser(sessionUser);

      if (sessionUser) {
        await loadProfile(sessionUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,

      async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw new Error(error.message);

        // Let the auth listener update state, but we can also eagerly load profile:
        const u = data?.user ?? null;
        if (u) await loadProfile(u.id);
      },

      async signup(payload) {
        const { firstName, lastName, phone, email, password } = payload;

        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw new Error(error.message);

        const u = data?.user ?? null;

        // If email confirmation is OFF, session exists and we can write profile immediately.
        // If confirmation is ON, u may exist but session may be null—still okay to attempt
        // profile write only when we have a user id and RLS allows it.
        if (u?.id) {
          const { error: profErr } = await supabase.from("profiles").upsert({
            id: u.id,
            first_name: firstName,
            last_name: lastName,
            phone: phone || null,
          });

          if (profErr) throw new Error(profErr.message);

          await loadProfile(u.id);
        }
      },

      async logout() {
        // Local sign-out clears the stored session immediately
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw new Error(error.message);

        // State will also be cleared by onAuthStateChange, but clearing here makes UI instant
        setUser(null);
        setProfile(null);
      },
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}