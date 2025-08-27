import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default async function StarredNotesPage() {
  return (
    <>
      <SetBreadcrumbs
        items={[{ label: "Notes", href: "#" }, { label: "Starred" }]}
      />
      <div>Starred Notes</div>
    </>
  );
}
