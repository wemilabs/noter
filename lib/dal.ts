import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { notebooks, notes } from "@/db/schema";

// Check session
export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id)
    return { success: false, message: "User not found. Unauthorized access." };

  return { success: true, session };
});

// --------------------------------------------------------------------------------------------

// Get notebooks data
export const getNotebooksForIndividualUser = cache(async () => {
  const session = await verifySession();
  if (!session.success) return { success: false, message: session.message };

  try {
    const userId = session.session?.user?.id;
    if (!userId) {
      return { success: false, message: "User ID not found" };
    }

    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: { notes: true },
      orderBy: (notebooks, { desc }) => [desc(notebooks.createdAt)],
    });

    return { success: true, notebooks: notebooksByUser };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
});

export const getNotebookByIdWithItsOwnNotes = cache(
  async (notebookId: string) => {
    const session = await verifySession();
    if (!session.success) return { success: false, message: session.message };

    try {
      const notebook = await db.query.notebooks.findFirst({
        where: eq(notebooks.id, notebookId),
        with: {
          notes: { orderBy: (notes, { desc }) => [desc(notes.createdAt)] },
        },
      });

      return { success: true, notebook };
    } catch (error: unknown) {
      const e = error as Error;
      return { success: false, message: e.message };
    }
  }
);

// --------------------------------------------------------------------------------------------

// Get notes data
export const getNoteById = cache(async (noteId: string) => {
  const session = await verifySession();
  if (!session.success) return { success: false, message: session.message };

  try {
    const note = await db.query.notes.findFirst({
      where: eq(notes.id, noteId),
      with: {
        notebook: true,
      },
    });

    return { success: true, note };
  } catch {
    return { success: false, message: "Failed to get note" };
  }
});
