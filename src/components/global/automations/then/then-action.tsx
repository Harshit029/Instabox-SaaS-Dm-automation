import { useListener } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import { SubscriptionPlan } from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id);

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? "bg-gray-300 border border-gray-400"
                    : "bg-gray-100 border border-gray-300",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p className="text-gray-800 font-medium">{listener.label}</p>
                </div>
                <p className="text-gray-600 text-sm">{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? "bg-gray-300 border border-gray-400"
                  : "bg-gray-100 border border-gray-300",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p className="text-gray-800 font-medium">{listener.label}</p>
              </div>
              <p className="text-gray-600 text-sm">{listener.description}</p>
            </div>
          )
        )}
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2 mt-2">
          <Textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart AI can use..."
                : "Add a message you want to send to your customers"
            }
            {...register("prompt")}
            className="bg-gray-100 border border-gray-300 text-gray-800"
          />
          <Input
            {...register("reply")}
            placeholder="Add a reply for comments (Optional)"
            className="bg-gray-100 border border-gray-300 text-gray-800"
          />
          <Button className="bg-gray-700 text-white hover:bg-gray-800 transition">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
