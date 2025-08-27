import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default function AccountPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: "Account" }]} />
      <div>My Account</div>
    </>
  );
}
