"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../components/SupabaseProvider";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { supabase } = useSupabase();

const [newAttendanceDate, setNewAttendanceDate] = useState("");
const [newAttendanceNotes, setNewAttendanceNotes] = useState("");

  const [attendance, setAttendance] = useState<any[]>([]);  
  const [techniques, setTechniques] = useState<any[]>([]);  
  const [notes, setNotes] = useState<any[]>([]);

const [newTechniqueName, setNewTechniqueName] = useState("");
const [newTechniqueDesc, setNewTechniqueDesc] = useState("");

const [newNoteContent, setNewNoteContent] = useState("");

// Add Attendance

const handleAddAttendance = async (e: any) => {
  e.preventDefault();
  const { data, error } = await supabase.from("attendance").insert([
    { user_id: user.id, class_date: newAttendanceDate, notes: newAttendanceNotes },
  ]);
  if (!error) setAttendance([data[0], ...attendance]);
  setNewAttendanceDate("");
  setNewAttendanceNotes("");
  <section style={{ marginTop: 20 }}>
  <h2>Attendance</h2>
  <form onSubmit={handleAddAttendance}>
    <input type="date" value={newAttendanceDate} onChange={(e) => setNewAttendanceDate(e.target.value)} required />
    <input type="text" placeholder="Notes" value={newAttendanceNotes} onChange={(e) => setNewAttendanceNotes(e.target.value)} />
    <button type="submit">Add Attendance</button>
  </form>
  {/* Attendance list below */}
</section>
};

// Add Technique
const handleAddTechnique = async (e: any) => {
  e.preventDefault();
  const { data, error } = await supabase.from("techniques").insert([
    { user_id: user.id, name: newTechniqueName, description: newTechniqueDesc },
  ]);
  if (!error) setTechniques([data[0], ...techniques]);
  setNewTechniqueName("");
  setNewTechniqueDesc("");
  <section style={{ marginTop: 20 }}>
  <h2>Techniques</h2>
  <form onSubmit={handleAddTechnique}>
    <input type="text" placeholder="Technique Name" value={newTechniqueName} onChange={(e) => setNewTechniqueName(e.target.value)} required />
    <input type="text" placeholder="Description" value={newTechniqueDesc} onChange={(e) => setNewTechniqueDesc(e.target.value)} />
    <button type="submit">Add Technique</button>
  </form>
  {/* Techniques list below */}
</section>
};

// Add Note
const handleAddNote = async (e: any) => {
  e.preventDefault();
  const { data, error } = await supabase.from("notes").insert([
    { user_id: user.id, content: newNoteContent },
  ]);
  if (!error) setNotes([data[0], ...notes]);
  setNewNoteContent("");
  <section style={{ marginTop: 20 }}>
  <h2>Notes</h2>
  <form onSubmit={handleAddNote}>
    <input type="text" placeholder="Write a note..." value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} required />
    <button type="submit">Add Note</button>
  </form>
  {/* Notes list below */}
</section>
};



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
