import { getNotebooksForIndividualUser } from "@/lib/dal";

import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";
import { SearchForm } from "@/components/forms/search-form";
import { CreateNotebookButton } from "@/components/dashboard/notebooks/create-notebook-button";
import { FilteredNotebooks } from "@/components/dashboard/notebooks/filtered-notebooks";

export default async function NotebooksPage() {
  const { success, notebooks, message } = await getNotebooksForIndividualUser();

  return (
    <>
      <SetBreadcrumbs items={[{ label: "Notebooks" }]} />
      <h1 className="text-2xl font-bold tracking-tight mt-4">Notebooks</h1>

      <div className="flex items-center justify-between">
        <SearchForm className="w-full max-w-sm" />
        <CreateNotebookButton />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
        {success ? (
          <FilteredNotebooks data={notebooks} />
        ) : (
          <div className="text-red-500">{message}</div>
        )}
      </div>
    </>
  );
}
