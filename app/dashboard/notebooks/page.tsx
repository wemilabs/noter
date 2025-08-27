import { getNotebooksForIndividualUser } from "@/lib/dal";
import { CreateNotebookButton } from "@/components/dashboard/notebooks/create-notebook-button";
import NotebookCard from "@/components/dashboard/notebooks/notebook-card";
import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default async function NotebooksPage() {
  const { success, notebooks, message } = await getNotebooksForIndividualUser();

  return (
    <>
      <SetBreadcrumbs items={[{ label: "Notebooks" }]} />
      <h1>Notebooks</h1>

      <div className="flex items-center justify-between">
        <div>A search maybe</div>
        <CreateNotebookButton />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {success ? (
          notebooks?.length === 0 ? (
            <div>No notebooks found</div>
          ) : (
            notebooks?.map((notebook) => (
              <NotebookCard key={notebook.id} notebook={notebook} />
            ))
          )
        ) : (
          <div className="text-red-500">{message}</div>
        )}
      </div>
    </>
  );
}
