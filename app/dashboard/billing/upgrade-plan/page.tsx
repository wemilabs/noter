import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default function UpgradePlanPage() {
  return (
    <>
      <SetBreadcrumbs
        items={[
          { label: "Billing", href: "/dashboard/billing" },
          { label: "Upgrade plan" },
        ]}
      />
      <div>Upgrade My Plan</div>
    </>
  );
}
