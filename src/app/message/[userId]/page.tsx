import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Params = {
  params: {
    userId: string;
  };
};

export default function MessagePage({ params: { userId } }: Params) {

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
  return (
    <div className="mx-20 ">
      <div>
        <p className="font-bold text-2xl">Message</p>
      </div>
      <div>

          <Textarea
            placeholder="Type here to send a message"
            className="mt-2"
            required
          />
          <div className="w-full flex justify-end mt-3">
            <Button className="w-[180px]">
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
  );
}
