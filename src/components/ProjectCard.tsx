import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  title: string;
  description: string;
  author: string;
  tags: string[];
};

export default function ProjectCard(
  { title, description, author, tags }: Props,
) {

  tags = tags.slice(0, 7)
  return (
    <Card className="w-[350px] md:w-[700px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
      </CardHeader>
      <CardContent>
        {description.length > 300
          ? `${description.substring(0, 300)}...`
          : description}
        <div className={`flex flex-wrap gap-2 rounded-md 'mb-3'}`}>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="transition-all border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center text-sm px-2 mt-3 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
