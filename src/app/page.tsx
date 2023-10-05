import Maintenance from "@/components/Maintenance";
import { MainNav } from "@/components/Nav";
import { Search } from "@/components/Search";
import { UserNav } from "@/components/UserNav";

export default function Home() {
  return (
    <div>
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center">
          <Search />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {/* <UserNav /> */}
        </div>
      </div>

      <Maintenance />
    </div>
  );
}
