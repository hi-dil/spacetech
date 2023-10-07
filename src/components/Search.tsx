import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Search() {
  return (
    <div className="flex gap-2 w-[350px] md:w-[700px]">
      <Input
        type="search"
        placeholder="Search Project..."
      />
      <Button type="submit" className="">
        <SearchIcon />
      </Button>
    </div>
  );
}
