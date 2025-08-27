"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { notebooks, InsertNotebook } from "@/db/schema";

export async function createNotebook(newNotebook: InsertNotebook) {
  try {
    await db.insert(notebooks).values(newNotebook);
    revalidatePath("/dashboard/notebooks");
    return { success: true, message: "Notebook created successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

export async function updateNotebook(
  notebookId: string,
  updatedNotebook: InsertNotebook
) {
  try {
    await db
      .update(notebooks)
      .set(updatedNotebook)
      .where(eq(notebooks.id, notebookId));
    revalidatePath("/dashboard/notebooks");
    return { success: true, message: "Notebook updated successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}

export async function deleteNotebook(notebookId: string) {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, notebookId));
    revalidatePath("/dashboard/notebooks");
    return { success: true, message: "Notebook deleted successfully" };
  } catch (error: unknown) {
    const e = error as Error;
    return { success: false, message: e.message };
  }
}
