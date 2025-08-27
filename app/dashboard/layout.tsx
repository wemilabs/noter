import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { BreadcrumbsProvider } from "@/contexts/breadcrumbs-context";
import { DashboardBreadcrumbs } from "@/components/dashboard/navigation/dashboard-breadcrumbs";

const baseCrumbs = [{ label: "Dashboard", href: "/dashboard" }];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <DashboardBreadcrumbs base={baseCrumbs} />
            </div>
            <ModeToggle />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BreadcrumbsProvider>
  );
}
