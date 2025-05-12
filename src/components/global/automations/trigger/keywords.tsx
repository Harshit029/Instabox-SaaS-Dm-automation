import { Input } from "@/components/ui/input";
import { useKeywords } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/user-queries";
import React from "react";

type Props = {
  id: string;
};

export const Keywords = ({ id }: Props) => {
  const { onValueChange, keyword, onKeyPress } = useKeywords(id);
  const { latestVariable } = useMutationDataState(["add-keyword"]);
  const { data } = useQueryAutomation(id);

  return (
    <div className="bg-gray-100 border border-gray-300 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-gray-600">Add words that trigger automations</p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.keywords &&
          data?.data?.keywords.length > 0 &&
          data?.data?.keywords.map(
            (word) =>
              word.id !== latestVariable?.variables?.id && (
                <div
                  className="bg-gray-200 text-gray-700 flex items-center gap-x-2 capitalize py-1 px-4 rounded-full"
                  key={word.id}
                >
                  <p>{word.word}</p>
                </div>
              )
          )}
        {latestVariable && latestVariable.status === "pending" && (
          <div className="bg-gray-200 text-gray-700 flex items-center gap-x-2 capitalize py-1 px-4 rounded-full">
            {latestVariable.variables.keyword}
          </div>
        )}
        <Input
          placeholder="Add keyword..."
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
          }}
          value={keyword}
          className="p-0 bg-transparent ring-0 border-none outline-none text-sm"
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />
      </div>
    </div>
  );
};

export default Keywords;
