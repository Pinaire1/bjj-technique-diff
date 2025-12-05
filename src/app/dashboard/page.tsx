"use client";

import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user.email}</h1>

      <section style={{ marginTop: 20 }}>
        <h2>Attendance</h2>
        <p>Your logged classes will appear here.</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Techniques</h2>
        <p>View your techniques and progress here.</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Notes</h2>
        <p>Any notes or comments you’ve added.</p>
      </section>
    </div>
  );
}
