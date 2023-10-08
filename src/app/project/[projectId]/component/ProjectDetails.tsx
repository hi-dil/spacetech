import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getData } from "@/lib/firebase/getData";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  projectID: string;
};

export default async function ProjectDetails({ projectID }: Props) {
  let messageid = 4;

  const getProductDetails = await getData("projects", projectID);

  if (getProductDetails.error || getProductDetails.result === null) {
    return <div>There&apos;s was something wrong when getting the product data</div>;
  }

  type forum = {
    id: number;
    username: string;
    message: string;
  };

  let forumdatas: forum[] = [
    {
      id: 1,
      username: "Wan Azib",
      message: "testing",
    },
    {
      id: 2,
      username: "Haidil",
      message: "testing 123",
    },
    {
      id: 3,
      username: "Wan Azib",
      message: "testing",
    },
  ];

  const projectData = getProductDetails.result.data();

  if (projectData == null) {
    return <div>There&apos;s was something wrong when getting the product data</div>;
  }

  // const addComment = (event: SyntheticEvent) => {
  //   event.preventDefault()
  //
  //   const displayName = localStorage.getItem("displayName")
  //   if (displayName === null) return
  //
  //   const forumdata: forum = {
  //     id: messageid,
  //     username: displayName,
  //     message: message
  //   }
  //
  //   forumdatas.push(forumdata)
  //
  // }

  const { title, displayName, description, tags, projectLinks, contribute } =
    projectData;

  return (
    <>
      <div className="flex">
        <div className=" mx-20 w-full">
          <p className="text-3xl font-bold">{title}</p>
          <p className="text-secondary-foreground text-xl">
            Author: {displayName}
          </p>

          <p className="mt-5 font-bold text-xl">Description</p>
          <p className=" text-justify">
            {description}
          </p>

          <p className="mt-5 font-bold text-xl">How To Contribute</p>
          <p className=" text-justify">
            {contribute}
          </p>

          <p className="mt-5 font-bold text-xl">Project Links</p>
          <div className="gap-2">
            {projectLinks.map((link: string, index: number) => (
              <Link key={index} href={link}>
                <Badge
                  variant="secondary"
                  className="m-1 p-1 px-4 hover:bg-red-100 cursor-pointer"
                >
                  <p>{link}</p>
                </Badge>
              </Link>
            ))}
          </div>

          <p className="mt-5 font-bold text-xl">Tags</p>
          <div className="gap-2">
            {tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="m-1 p-1 px-4">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between mt-5">
            <Button className="w-[180px]" variant="outline">
              Request to join
            </Button>
            <Link href="/message/0e00f746-5e4b-467d-a95e-cf280e6b4ec6">
              <Button className="w-[180px]">
                Send a message
              </Button>
            </Link>
          </div>

          <p className="mt-10 font-bold text-2xl">Forum</p>
          <Textarea
            placeholder="Type here to leave a comment"
            className="mt-2"
            required
          />

          <div className="w-full flex justify-end mt-3">
            <Button className="w-[180px]" variant="secondary">
              Post a comment
            </Button>
          </div>

          <div className="flex flex-col w-full gap-3 mt-10">
            {forumdatas.map((forum) => (
              <div key={forum.id} className="w-full flex">
                <Card className="w-full">
                  <CardContent className="p-3">
                    <p className="font-bold text-l">{forum.username}</p>
                    <p>{forum.message}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
