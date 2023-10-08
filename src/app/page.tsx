import ProjectCard from "@/components/ProjectCard";
import { Search } from "@/components/Search";
import Link from "next/link";
import { DisplayProjects } from "./component/ProjectList";

export const revalidate = 300

export default function Home() {

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2">
      <Search />
      <DisplayProjects />
    </div>
  );
}
