import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default async function LatestNotesPage() {
  return (
    <>
      <SetBreadcrumbs
        items={[{ label: "Notes", href: "#" }, { label: "Latest" }]}
      />
      <div>What you&apos;ve recently been working on</div>
    </>
  );
}
