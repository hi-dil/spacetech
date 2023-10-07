import ProjectCard from "@/components/ProjectCard";
import { Search } from "@/components/Search";
import Link from "next/link";

export default function Home() {
  const projects = [{
    id: 1,
    title: "Project1",
    author: "Haidil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat nisi tellus, quis pulvinar erat bibendum eget. Duis finibus arcu nec rutrum auctor. Morbi suscipit hendrerit enim dictum consequat. Aenean quis lacinia augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin dui mauris, sodales nec laoreet eu, volutpat id odio. Sed volutpat odio eu massa varius, eu sollicitudin erat bibendum. Fusce in laoreet odio, vitae finibus turpis. Quisque turpis lectus, venenatis quis porta sed, aliquam quis lorem. Suspendisse malesuada, nisi et faucibus accumsan, massa eros sodales ipsum, vitae interdum nisi tellus vitae arcu. Integer non odio vel neque posuere auctor et non massa. Pellentesque porta urna eget volutpat vulputate.",
    tags: ["test", "web dev", "third"]
  }, {
    id: 2,
    title: "Project1",
    author: "Haidil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc conseq",
    tags: ["test", "web dev", "third"]
  }];

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2 ">
      <Search />
      {projects.map((project) => <Link key={project.id} href={`/project/${project.id}`}><ProjectCard {...project} /></Link>)}
    </div>
  );
}
