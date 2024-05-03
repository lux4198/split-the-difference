import { Card } from "@mantine/core";
import React from "react";

function LoadingCard() {
  return (
    <Card
      className={
        "mb-4 dark:text-white max-w-[600px] min-h-[150px] flex flex-col [&>*]:animate-pulse gap-2"
      }
      styles={{ root: { backgroundColor: "rgba(159, 203, 209, .3)" } }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <span className="h-3 w-[30%] bg-gray-400 rounded-md" />
      <span className="h-3 w-[30%] bg-transparend rounded-md" />
      <div className="flex gap-5">
        <span className="h-3 w-[40%] bg-gray-400 rounded-md" />
        <span className="h-3 w-[20%] bg-gray-400 rounded-md" />
      </div>
      <span className="h-3 w-[80%] bg-gray-400 rounded-md" />
      <span className="h-3 w-[80%] bg-gray-400 rounded-md" />
      <span className="h-3 w-[80%] bg-gray-400 rounded-md" />
    </Card>
  );
}

export default LoadingCard;
