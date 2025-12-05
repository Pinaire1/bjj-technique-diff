"use client";

import { useAuth } from "../context/AuthContext";
import { useSupabase } from "../components/SupabaseProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Attendance = {
  id: number;
  class_date: string;
  notes: string | null;
};

type Technique = {
  id: number;
  name: string;
  description: string | null;
  practiced_on: string;
};

type Note = {
  id: number;
  content: string;
  created_at: string;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Fetch data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Attendance
      const { data: attendanceData } = await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", user.id)
        .order("class_date", { ascending: false });

      setAttendance(attendanceData || []);

      // Techniques
      const { data: techniquesData } = await supabase
        .from("techniques")
        .select("*")
        .eq("user_id", user.id)
        .order("practiced_on", { ascending: false });

      setTechniques(techniquesData || []);

      // Notes
      const { data: notesData } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotes(notesData || []);
    };

    fetchData();
  }, [supabase, user]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user.email}</h1>

      <section style={{ marginTop: 20 }}>
        <h2>Attendance</h2>
        {attendance.length === 0 ? (
          <p>No classes logged yet.</p>
        ) : (
          <ul>
            {attendance.map((a) => (
              <li key={a.id}>
                {a.class_date} {a.notes && `- Notes: ${a.notes}`}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Techniques</h2>
        {techniques.length === 0 ? (
          <p>No techniques logged yet.</p>
        ) : (
          <ul>
            {techniques.map((t) => (
              <li key={t.id}>
                {t.name} {t.description && `- ${t.description}`} ({t.practiced_on})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Notes</h2>
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          <ul>
            {notes.map((n) => (
              <li key={n.id}>
                {n.content} ({new Date(n.created_at).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
