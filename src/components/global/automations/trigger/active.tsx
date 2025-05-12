import { InstagramBlue, PlaneBlue } from "@/icons";
import React from "react";

type Props = {
  type: string;
  keywords: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
};

function ActiveTrigger({ keywords, type }: Props) {
  return (
    <div className="bg-gray-100 border border-gray-300 p-3 rounded-xl w-full">
      <div className="flex gap-x-2 items-center mb-2">
        {type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}
        <p className="text-lg text-gray-800 font-semibold">
          {type === "COMMENT"
            ? "User comments on my post"
            : "User sends me a direct message"}
        </p>
      </div>
      <p className="text-sm text-gray-600">
        {type === "COMMENT"
          ? "If the user comments on a video that is set up to listen for keywords, this automation will trigger."
          : "If the user sends a direct message that is set up to listen for keywords, this automation will trigger."}
      </p>
      <div className="flex gap-2 mt-4 flex-wrap">
        {keywords.map((word) => (
          <div
            key={word.id}
            className="bg-gray-200 text-gray-700 text-sm font-normal py-1 px-4 rounded-full capitalize"
          >
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveTrigger;
