import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone")
      .eq("id", userId)
      .single();

    if (!error) setProfile(data);
  }

  useEffect(() => {
    // 1) get session on refresh
    (async () => {
      const { data } = await supabase.auth.getSession();
      const u = data?.session?.user ?? null;
      setUser(u);
      if (u) await loadProfile(u.id);
      setLoading(false);
    })();

    // 2) listen for auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setProfile(null);
      if (u) await loadProfile(u.id);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,

      async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        setUser(data.user);
        if (data.user) await loadProfile(data.user.id);
      },

      async signup(payload) {
        const { firstName, lastName, phone, email, password } = payload;

        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw new Error(error.message);

        const u = data.user;
        setUser(u);

        // If email confirmation is ON, u may exist but session may be null until confirmed.
        // Still safe to try profile insert only when we have a user id.
        if (u?.id) {
          const { error: profErr } = await supabase.from("profiles").insert({
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
        await supabase.auth.signOut();
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