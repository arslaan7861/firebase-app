import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useUser } from "@/providers/user";

function LogoutButton({ className }: { className?: string }) {
  const { logout } = useUser();
  return (
    <Button variant={"destructive"} className={className} onClick={logout}>
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}

export default LogoutButton;
