import { Badge } from "@/components/ui/badge";
import ProjectDetails from "./component/ProjectDetails";

type Params = {
  params: {
    projectId: string;
  };
};

export default function UserPage({ params: { projectId } }: Params) {

  return (
    <div className="mb-20">
    <ProjectDetails projectID={projectId} />
  
    </div>
  );
}
