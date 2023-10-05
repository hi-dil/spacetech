import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="flex gap-2">
      <Input
        type="search"
        placeholder="Search Project..."
        className="md:w-[200px] lg:w-[300px]"
      />
      <Button type="submit" className="">
        <SearchIcon />
      </Button>
    </div>
  );
}
