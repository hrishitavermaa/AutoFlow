import {
  BadgeX,
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteUser, logoutUser } from "@/actions/user";
import { toast } from "sonner";

export function AppSidebar() {
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.data) {
      toast.success(response.data);
    }
  };

  const handleDelete = async () => {
    const response = await deleteUser();
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.data) {
      toast.success(response.data);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col items-center py-6">
          {/* Increased Avatar Size */}
          <Avatar className="w-24 h-24">
            <AvatarImage src={session?.user?.image || ""} alt="User Avatar" />
            <AvatarFallback className="text-2xl">
              {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center mt-4">
            <h1 className="text-lg font-semibold">
              {session?.user?.name || "User"}
            </h1>
            <p className="text-gray-500 text-sm">
              {session?.user?.email || "No email"}
            </p>
          </div>
        </div>
        <div className="p-3">
          <Card>
            <CardContent>
              <p>Greater Noida</p>
              <p>Haze</p>
              <p>18℃</p>
            </CardContent>
          </Card>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleLogout}>
                  <div className="flex items-center">
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleDelete}>
                  <div className="flex items-center text-red-600">
                    <BadgeX />
                    <span>Delete Account</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
