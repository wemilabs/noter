import { getNotebookByIdWithItsOwnNotes } from "@/lib/dal";

import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";
import { SearchForm } from "@/components/forms/search-form";
import { CreateNoteButton } from "@/components/dashboard/notes/create-note-button";
import { FilteredNotes } from "@/components/dashboard/notes/filtered-notes";

export default async function NotebookPage({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;
  const { success, notebook, message } =
    await getNotebookByIdWithItsOwnNotes(notebookId);

  return (
    <>
      <SetBreadcrumbs
        items={[
          { label: "Notebooks", href: "/dashboard/notebooks" },
          { label: notebook?.name || "Notebook" },
        ]}
      />
      <h1 className="text-2xl font-bold tracking-tight mt-4">
        {notebook?.name}
      </h1>

      <div className="flex items-center justify-between">
        <SearchForm className="w-full max-w-sm" />
        <CreateNoteButton notebookId={notebookId} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
        {success ? (
          <FilteredNotes data={notebook?.notes} />
        ) : (
          <div className="text-red-500">{message}</div>
        )}
      </div>
    </>
  );
}
