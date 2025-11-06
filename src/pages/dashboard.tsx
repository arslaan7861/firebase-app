import { useUser } from "@/providers/user";
import Header from "@/components/header";
import UserCard from "@/components/UserCard";
import UserList from "@/components/UserList";

export function Dashboard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <UserCard />
        {/* Admin View */}
        <UserList />
      </div>
    </div>
  );
}
