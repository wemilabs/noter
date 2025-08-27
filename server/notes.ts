"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { notes, InsertNote } from "@/db/schema";

export async function createNote(newNote: InsertNote) {
  try {
    await db.insert(notes).values(newNote);
    revalidatePath("/dashboard/notes");
    return { success: true, message: "Note created successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

export async function updateNote(
  noteId: string,
  updatedNote: Partial<InsertNote>
) {
  try {
    await db.update(notes).set(updatedNote).where(eq(notes.id, noteId));
    revalidatePath("/dashboard/notes");
    return { success: true, message: "Note updated successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

export async function deleteNote(noteId: string) {
  try {
    await db.delete(notes).where(eq(notes.id, noteId));
    revalidatePath("/dashboard/notes");
    return { success: true, message: "Note deleted successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}
