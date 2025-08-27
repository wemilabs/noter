import { SetBreadcrumbs } from "@/components/dashboard/navigation/set-breadcrumbs";

export default function NotificationsPage() {
  return (
    <>
      <SetBreadcrumbs items={[{ label: "Notifications" }]} />
      <div>Notifications</div>
    </>
  );
}
