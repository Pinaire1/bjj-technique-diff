import { supabase } from "./supabaseClient";

/* ================================
   ATTENDANCE
================================ */

/**
 * Log a training session for the current user.
 */
export async function logAttendance(userId) {
  const { data, error } = await supabase
    .from("attendance")
    .insert([{ user_id: userId, class_date: new Date() }]);

  if (error) {
    console.error("Error logging attendance:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Fetch all attendance records belonging to the current user.
 */
export async function getAttendance(userId) {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId)
    .order("class_date", { ascending: true });

  if (error) {
    console.error("Error fetching attendance:", error);
    throw new Error(error.message);
  }

  return data;
}

/* ================================
   TECHNIQUES
================================ */

/**
 * Fetch all techniques (public read allowed).
 */
export async function getTechniques() {
  const { data, error } = await supabase
    .from("techniques")
    .select("*")
    .order("belt_level", { ascending: true });

  if (error) {
    console.error("Error fetching techniques:", error);
    throw new Error(error.message);
  }

  return data;
}

/* ================================
   NOTES
================================ */

/**
 * Add a note linked to a technique for the current user.
 */
export async function addNote(userId, techniqueId, content) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: userId, technique_id: techniqueId, content }]);

  if (error) {
    console.error("Error saving note:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get all notes for a technique belonging to this user.
 */
export async function getNotesByTechnique(userId, techniqueId) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .eq("technique_id", techniqueId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    throw new Error(error.message);
  }

  return data;
}
