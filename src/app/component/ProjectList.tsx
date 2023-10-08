import ProjectCard from "@/components/ProjectCard";
import { getProjectsByPagination } from "@/lib/firebase/getData";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";

export async function DisplayProjects() {
  let data: ProjectType[] = [];
  const maxRows = 20;
  const startindex = 0;

  const getProjects = await getProjectsByPagination(maxRows, startindex);

  if (getProjects.error) {
    console.log(getProjects.error);
    return;
  }
  
  data = [...data, ...getProjects.result]

  console.log(data)

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2">
      {data.map((project) => (
        <Link key={project.recId} href={`/project/${project.recId}`}>
          <ProjectCard title={project.title} description={project.description} author={project.displayName} tags={project.tags} />
        </Link>
      ))}
    </div>
  );
}
