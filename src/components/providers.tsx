"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <Toaster />
        <div className="w-full p-10">{children}</div>
      </SidebarProvider>
    </SessionProvider>
  );
}
