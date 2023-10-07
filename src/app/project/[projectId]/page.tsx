import { Badge } from "@/components/ui/badge";

type Params = {
  params: {
    projectId: string;
  };
};

export default function UserPage({ params: { projectId } }: Params) {
  return (
    <>
      <div className="flex">
        <div className=" mx-20">
          <p className="text-5xl font-bold">Test</p>
          <p className="text-secondary-foreground text-xl">Author: Haidil</p>
          <p className="mt-5 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            molestie neque eu malesuada molestie. Aliquam erat volutpat.
            Curabitur ut fermentum purus. Quisque libero urna, ornare et metus
            eu, bibendum egestas sem. Vestibulum laoreet urna ornare congue
            lacinia. Pellentesque faucibus porttitor laoreet. Nulla tristique
            vel enim eget aliquet. In at nunc non lorem fringilla pretium.
            Suspendisse volutpat quam venenatis libero tempus, non mollis lorem
            fringilla. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas.
          </p>
          <p className="mt-5">Tags:</p>
          {}
          <div className="gap-2">
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
            <Badge variant="secondary" className="m-1">Secondary</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
