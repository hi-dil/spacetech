import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/firebase/getData";

type Props = {
  projectID: string;
};

export default async function ProjectDetails({ projectID }: Props) {
  const getProductDetails = await getData("projects", projectID);


  if (getProductDetails.error || getProductDetails.result === null) {
    return <div>There's was something wrong when getting the product data</div>;
  }

  const projectData = getProductDetails.result.data();

  if (projectData == null) {
    return <div>There's was something wrong when getting the product data</div>;
  }

  const { title, displayName, description, tags } = projectData;

  return (
    <>
      <div className="flex">
        <div className=" mx-20">
          <p className="text-5xl font-bold">{title}</p>
          <p className="text-secondary-foreground text-xl">Author: {displayName}</p>
          <p className="mt-5 text-justify">
            {description}
          </p>
          <p className="mt-5">Tags:</p>
          {}
          <div className="gap-2">
            {tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="m-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
