import { useUser } from "@/providers/user";
import Header from "@/components/header";
import UserCard from "@/components/UserCard";
import UserList from "@/components/UserList";

export function Dashboard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl lg:px-8 py-8 space-y-8 p-4 md:p-8">
        <UserCard />
        {/* Admin View */}
        <UserList />
      </div>
    </div>
  );
}
