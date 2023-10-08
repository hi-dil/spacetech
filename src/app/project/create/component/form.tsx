"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { AddProjectData } from "@/lib/firebase/AddData";
import { v4 as uid } from "uuid";
import { useRouter } from "next/navigation";
import validator from "validator";
import { generateTagsFromDescription } from "@/lib/chatgpt";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tempTag, setTempTag] = useState("");
  const [projectLinks, setProjectLink] = useState<string[]>([]);
  const [tempLink, setTempLink] = useState("");
  const [contribute, setContribute] = useState("");
  const [isGenLoading, setIsGenLoading] = useState(false)
  const router = useRouter();

  const handleKeyDown = (event: any, action: string) => {
    if (event.key === "Enter") {
      if (action === "tag") {
        addTag(event);
      }

      if (action === "link") {
        addLink(event);
      }
    }
  };

  const addTag = (event: SyntheticEvent) => {
    event.preventDefault();

    // check if tag already exist
    if (tags.includes(tempTag)) {
      return;
    }

    if (tempTag.length !== 0) {
      setTags([...tags, tempTag]);
      setTempTag("");
    }
  };

  const removeTag = (event: SyntheticEvent, omitTag: string) => {
    event.preventDefault();
    setTags(tags.filter((item) => item !== omitTag));
  };

  const addLink = (event: SyntheticEvent) => {
    event.preventDefault();

    // check if tag already exist
    if (projectLinks.includes(tempLink) || !validator.isURL(tempLink)) {
      return;
    }

    if (tempLink.length !== 0) {
      setProjectLink([...projectLinks, tempLink]);
      setTempLink("");
    }
  };

  const removeLink = async (event: SyntheticEvent, omitTag: string) => {
    event.preventDefault();
    setProjectLink(projectLinks.filter((item) => item !== omitTag));
  };

  const generateTag = async (event: SyntheticEvent) => {
    setIsGenLoading(true)
    event.preventDefault();

    if (description.length === 0) {
      setIsGenLoading(false)
      return
    }

    const gptcall = await generateTagsFromDescription(description);
    console.log(gptcall)
    if (gptcall.error || gptcall.result?.length === 0 || gptcall.result === null) {
      console.log(error)
      setIsGenLoading(false)
      return
    }
    gptcall.result = gptcall.result?.replace(/'/g, '"')

    const gptTags = JSON.parse(gptcall.result) as string[]

    setTags([...tags, ...gptTags])
    setIsGenLoading(false)

  };

  async function onSubmit(event: SyntheticEvent) {
    setError("");
    setIsLoading(true);
    event.preventDefault();

    const userId = localStorage.getItem("userID");
    const displayName = localStorage.getItem("displayName");
    if (!userId || !displayName) {
      setIsLoading(false);
      return;
    }

    const id = uid();
    const projectData: ProjectType = {
      recId: id,
      displayName: displayName,
      userId: userId,
      title: title,
      description: description,
      tags: tags,
      createDate: new Date(),
      lastUpdateDate: new Date(),
      extdata: {},
      projectLinks: projectLinks,
      contribute: contribute,
    };

    const addProject = await AddProjectData(id, projectData);

    if (addProject.error) {
      setIsLoading(false);
      return;
    }

    router.push(`/project/${id}`);
  }

  return (
    <div className={cn("flex justify-center mb-10", className)} {...props}>
      <form onSubmit={onSubmit} className="w-[350px] md:w-[700px]">
        <div className="grid gap-10">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              type="text"
              id="title"
              required
              placeholder="Project title"
              className="mt-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              placeholder="Type your project description"
              className="mt-2"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button variant="secondary" onClick={generateTag} disabled={isGenLoading}>
              {isGenLoading &&
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Generate Tags
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">How To Contribute</Label>
            <Textarea
              placeholder="Tell us how can we help contribute to your project"
              className="mt-2"
              required
              onChange={(e) => setContribute(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="projectlinks">Project Links</Label>
            <div>
              {projectLinks.map((link) => (
                <Badge variant="secondary" className="m-1">
                  {link}
                  <span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={(e) =>
                        removeLink(e, link)}
                      className={cn(
                        "py-1 pl-4 pr-2 h-full hover:bg-transparent",
                      )}
                    >
                      <p className="text-sm text-secondary-foreground">X</p>
                    </Button>
                  </span>
                </Badge>
              ))}
            </div>

            <Input
              type="text"
              id="projectlinks"
              value={tempLink}
              placeholder="Project Link"
              onKeyDown={(e) => handleKeyDown(e, "link")}
              className="mt-2"
              onChange={(e) => setTempLink(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={(e) => addLink(e)}
            >
              Add Tags
            </Button>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div>
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="m-1">
                  {tag}
                  <span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={(e) => removeTag(e, tag)}
                      className={cn(
                        "py-1 pl-4 pr-2 h-full hover:bg-transparent",
                      )}
                    >
                      <p className="text-sm text-secondary-foreground">X</p>
                    </Button>
                  </span>
                </Badge>
              ))}
            </div>

            <Input
              type="text"
              id="tags"
              onKeyDown={(e) => handleKeyDown(e, "tag")}
              value={tempTag}
              placeholder="Project Tags"
              className="mt-2"
              onChange={(e) => setTempTag(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={(e) => addTag(e)}
            >
              Add Tags
            </Button>
          </div>

          <div className="flex justify-between">
            <Button className="w-[200px]" variant="outline" disabled={isLoading}>
              Load Project From OSDR
            </Button>
            <Button className="w-[180px]" disabled={isLoading}>
              {isLoading &&
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
