"use client";
import { usePaths } from "@/hooks/user-nav";
import { cn, getMonth } from "@/lib/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";
import { useQueryAutomations } from "@/hooks/user-queries";
import CreateAutomation from "../create-automation";
import { useMutationDataState } from "@/hooks/use-mutation-data";

type Props = {};

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations();
  const { latestVariable } = useMutationDataState(["create-automation"]);
  const { pathname } = usePaths();

  const optimisticUiData = useMemo(() => {
    if (latestVariable?.variables && data) {
      return { data: [latestVariable.variables, ...data.data] };
    }
    return data || { data: [] };
  }, [latestVariable, data]);

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3 bg-gray-50">
        <h3 className="text-lg text-gray-500">No Automations </h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3 bg-gray-50 p-4 rounded-xl">
      {optimisticUiData.data!.map((automation) => (
        <Link
          href={`${pathname}/${automation.id}`}
          key={automation.id}
          className="bg-white hover:bg-gray-100 transition duration-100 rounded-xl p-5 border border-gray-200 flex"
        >
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold text-gray-700">{automation.name}</h2>
            <p className="text-gray-500 text-sm font-light mb-2">
              This is from the comment
            </p>

            {automation.keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {
                  //@ts-ignore
                  automation.keywords.map((keyword, key) => (
                    <div
                      key={keyword.id}
                      className={cn(
                        "rounded-full px-4 py-1 capitalize text-sm text-gray-700",
                        key % 4 === 0 &&
                          "bg-green-100 border border-green-300",
                        key % 4 === 1 &&
                          "bg-purple-100 border border-purple-300",
                        key % 4 === 2 &&
                          "bg-yellow-100 border border-yellow-300",
                        key % 4 === 3 &&
                          "bg-red-100 border border-red-300"
                      )}
                    >
                      {keyword.word}
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="rounded-full border border-dashed border-gray-400 mt-3 px-3 py-1">
                <p className="text-sm text-gray-500">No Keywords</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between text-right">
            <p className="capitalize text-sm font-light text-gray-500">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{" "}
              {automation.createdAt.getUTCDate()}{" "}
              {automation.createdAt.getUTCFullYear()}
            </p>

            {automation.listener?.listener === "SMARTAI" ? (
              <GradientButton
                type="BUTTON"
                className="w-full text-white bg-gradient-to-r from-gray-600 to-gray-800 hover:opacity-90"
              >
                Smart AI
              </GradientButton>
            ) : (
              <Button className="bg-gray-600 hover:bg-gray-700 text-white">
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
