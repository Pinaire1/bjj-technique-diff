"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../components/SupabaseProvider";

// shadcn components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Types
interface Attendance {
  id: string;
  class_date: string;
  notes: string | null;
}

interface Technique {
  id: string;
  name: string;
  description: string | null;
}

interface Note {
  id: string;
  content: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { supabase } = useSupabase();

  // ----- FORM STATE -----
  const [newAttendanceDate, setNewAttendanceDate] = useState("");
  const [newAttendanceNotes, setNewAttendanceNotes] = useState("");

  const [newTechniqueName, setNewTechniqueName] = useState("");
  const [newTechniqueDesc, setNewTechniqueDesc] = useState("");

  const [newNoteContent, setNewNoteContent] = useState("");

  // ----- DATA STATE -----
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Fetch existing data on load
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const { data: att } = await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", user.id)
        .order("class_date", { ascending: false });

      const { data: tech } = await supabase
        .from("techniques")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      const { data: nts } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (att) setAttendance(att);
      if (tech) setTechniques(tech);
      if (nts) setNotes(nts);
    };

    loadData();
  }, [user, supabase]);

  if (loading || !user) {
    return <div className="p-10">Loading...</div>;
  }

  // ----- HANDLERS -----
  const handleAddAttendance = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("attendance").insert([
      {
        user_id: user.id,
        class_date: newAttendanceDate,
        notes: newAttendanceNotes,
      },
    ]);

    if (!error && data) {
      setAttendance([data[0] as Attendance, ...attendance]);
    }

    setNewAttendanceDate("");
    setNewAttendanceNotes("");
  };

  const handleAddTechnique = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("techniques").insert([
      {
        user_id: user.id,
        name: newTechniqueName,
        description: newTechniqueDesc,
      },
    ]);

    if (!error && data) {
      setTechniques([data[0] as Technique, ...techniques]);
    }

    setNewTechniqueName("");
    setNewTechniqueDesc("");
  };

  const handleAddNote = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("notes").insert([
      {
        user_id: user.id,
        content: newNoteContent,
      },
    ]);

    if (!error && data) {
      setNotes([data[0] as Note, ...notes]);
    }

    setNewNoteContent("");
  };

  // ---------- UI ----------
  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>

      {/* Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAttendance} className="flex gap-3 mb-4">
            <Input
              type="date"
              value={newAttendanceDate}
              onChange={(e) => setNewAttendanceDate(e.target.value)}
              required
            />
            <Input
              placeholder="Notes"
              value={newAttendanceNotes}
              onChange={(e) => setNewAttendanceNotes(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>

          <Separator className="my-3" />

          <ul className="space-y-2">
            {attendance.map((item) => (
              <li key={item.id} className="text-sm">
                <span className="font-medium">{item.class_date}</span> —{" "}
                {item.notes || "No notes"}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Techniques */}
      <Card>
        <CardHeader>
          <CardTitle>Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTechnique} className="flex gap-3 mb-4">
            <Input
              placeholder="Technique Name"
              value={newTechniqueName}
              onChange={(e) => setNewTechniqueName(e.target.value)}
              required
            />
            <Input
              placeholder="Description"
              value={newTechniqueDesc}
              onChange={(e) => setNewTechniqueDesc(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>

          <Separator className="my-3" />

          <ul className="space-y-2">
            {techniques.map((tech) => (
              <li key={tech.id} className="text-sm">
                <strong>{tech.name}</strong>: {tech.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote} className="flex gap-3 mb-4">
            <Input
              placeholder="Write a note..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              required
            />
            <Button type="submit">Add</Button>
          </form>

          <Separator className="my-3" />

          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="text-sm">
                {note.content}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
