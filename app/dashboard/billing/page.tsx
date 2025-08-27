import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default function BillingPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: "Billing" }]} />
      <div>Billing</div>
    </>
  );
}
