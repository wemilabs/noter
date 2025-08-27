import { getNotebookById } from "@/lib/dal";
import { CreateNoteButton } from "@/components/dashboard/notes/create-note-button";
import NoteCard from "@/components/dashboard/notes/note-card";
import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default async function NotebookPage({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;
  const { success, notebook, message } = await getNotebookById(notebookId);

  return (
    <>
      <SetBreadcrumbs
        items={[
          { label: "Notebooks", href: "/dashboard/notebooks" },
          { label: notebook?.name || "Notebook" },
        ]}
      />
      <h1>{notebook?.name}</h1>

      <div className="flex items-center justify-between">
        <div>A search maybe</div>
        <CreateNoteButton notebookId={notebookId} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {success ? (
          notebook?.notes?.length === 0 ? (
            <div>No notes found</div>
          ) : (
            notebook?.notes
              ?.reverse()
              .map((note) => <NoteCard key={note.id} note={note} />)
          )
        ) : (
          <div className="text-red-500">{message}</div>
        )}
      </div>
    </>
  );
}
