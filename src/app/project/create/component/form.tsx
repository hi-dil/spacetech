"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    setError("");
    event.preventDefault();
  }

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <form onSubmit={onSubmit} className="w-[350px] md:w-[700px]">
        <div className="grid gap-10">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Project title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              placeholder="Type your project description"
              className="mt-2"
            />
            <div className="flex justify-end mt-2">
              <Button variant="secondary">
                Generate Tags
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div>
              <Badge variant="secondary" className="m-1">
                Web Dev<span>
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn("py-1 pl-4 pr-2 h-full hover:bg-transparent")}
                  >
                    <p className="text-sm text-secondary-foreground">X</p>
                  </Button>
                </span>
              </Badge>
            </div>

            <Input
              type="text"
              id="tags"
              placeholder="Project Tags"
              className="mt-2"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Add Tags
            </Button>
          </div>

          <Button className="w-[150px]">Create Project</Button>
        </div>
      </form>
    </div>
  );
}
