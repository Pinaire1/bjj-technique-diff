"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useSupabase } from "./SupabaseProvider";

export default function Navbar() {
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav style={{ padding: 20, display: "flex", gap: 20 }}>
      <Link href="/">Home</Link>
      {user ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
